const searchvalue = document.querySelector('.search-box')
const searchBtn = document.querySelector('.search-btn')
const ip_add = document.getElementById('ip')
const ip_location = document.getElementById('location')
const timeZone = document.getElementById('time')
const isp = document.getElementById('isp')
var map = L.map('map', { zoomControl: false })
const svgIcon = L.divIcon({
    html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>`,
    className: "",
    iconSize: [12, 20],
    iconAnchor: [12, 40],
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Â© OpenStreetMap'
}).addTo(map);
const setMarker = (pos = []) => {
    map.setView([...pos], 13);
    var marker = L.marker([...pos], { icon: svgIcon }).addTo(map);
}
const GetIpInfo = async (ip) => {
    let add = `https://geo.ipify.org/api/v2/country,city?apiKey=at_Hp4uhRtK2Aav3TrZoJqx051Ais0lK`
    let arr = null
    let count = 0;
    let api_url = null
    if (ip !== undefined) {
        arr = ip.split('.')
        for (let i = 0; i < arr.length; i++) {
            const val = arr[i];
            if (val == '.') count += 1
        }
    }
    if (ip !== undefined) {
        if (count > 3) {
            api_url = `${add}&ipaddress=${ip}`
        }
        api_url = `${add}&domain=${ip}`
    }
    if (ip === undefined) api_url = add
    const req = await fetch(api_url)
    const res = await req.json()
    ip_location.textContent = `${res.location.city}, ${res.location.postalCode} ${res.location.region}`
    timeZone.textContent = `UTC${res.location.timezone}`
    isp.textContent = res.isp
    ip_add.textContent = res.ip
    setMarker([res.location.lat, res.location.lng])
}
GetIpInfo()
searchBtn.addEventListener('click', () => {
    const value = searchvalue.value
    GetIpInfo(value)
})