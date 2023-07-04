let displayIpAddress=document.getElementById("displayIpAddress");
let locationDetails=document.getElementsByClassName("location-details")[0];
let map=document.getElementsByClassName("map")[0];
let timeZone=document.getElementsByClassName("timeZone")[0];
let postDetails=document.getElementsByClassName("postDetails")[0]

const mapKey="AIzaSyCgYRbd2xE4gmn-6JKgnyA-CUaTLMUzIfI";

// function to get IP Address:

$.getJSON("https://api.ipify.org?format=json")
.then((data)=>{
    let innterH=`<h2>My Public IP Address: ${data.ip}</h2>`;
    displayIpAddress.innerHTML=innterH;
    fetchApi(data.ip)
}).catch((Error)=>{
    console.log("IP Address Not Available",Error);
})

// button function:
function ipaddress(){
   document.getElementById("submit").style.display="none";
   document.getElementById("display-user-data").style.visibility="visible";
}



async function fetchApi(IP){
    try{
        let response=await fetch(`https://ipinfo.io/${IP}?token=b4e22ce5c7422c`);
        let results=await response.json();
        diplayData(results);
    }
    catch(Error){
        console.log("Location Not Available", Error)
    }
}

function diplayData(api){
    let loc=api.loc;
    let coordinates=loc.split(",");
    let innerDetails=`
        <h3>Lat: ${coordinates[0]}</h3>  
        <h3>City: ${api.city} </h3>  
        <h3>Organization: ${api.asn.asn+" "+api.asn.name}</h3>  
        <h3>Long: ${coordinates[1]} </h3>  
        <h3>Region: ${api.region} </h3>  
        <h3>Hostname: ${api.timezone} </h3>  
    `;
    locationDetails.innerHTML=innerDetails;

    let mapDetails=`
    <iframe src="https://maps.google.com/maps?q=${coordinates[0]},${coordinates[1]}&z=15&output=embed" 
    width="100%" height="100%"></iframe>
    `;
    map.innerHTML=mapDetails;
    Pincodes(api.timezone, api.postal);
    getPostDetails(api.postal);
    

}

function getTime(timeZone){
    return new Date().toLocaleString("en-us", {
        timeZone:timeZone,
    })
}

function Pincodes(timezone, pin) {
    let pincodeCount = 0;
        fetch(`https://api.postalpincode.in/pincode/${pin}`)
        .then((response) => response.json())
        .then((data) => {
            const postOffices = data[0].PostOffice;
            postOffices.forEach((element) => {
            pincodeCount++;
            });

            let time=`
                <h3>Time Zone: ${timezone}</h3>
                <h3>Date And Time: ${getTime(timezone)}</h3>
                <h3>Pincode: ${pin}</h3>
                <h3>Number of pincode(s) found:${pincodeCount}</h3>
        `;

        timeZone.innerHTML=time;
        }).catch(Error =>{
            console.log("Pincode not valid!", Error)
    });
}

function getPostDetails(pinCode){
    fetch(`https://api.postalpincode.in/pincode/${pinCode}`)
        .then((response) => response.json())
        .then(data =>{
            const ele=data[0].PostOffice;
            for(let i=0;i<ele.length;i++){
                let div=document.createElement("div");
                let innerData=`
                    <p>Name: ${ele[i].Name}</p>
                    <p>BranchType: ${ele[i].BranchType}</p>
                    <p>DeliveryStatus: ${ele[i].DeliveryStatus}</p>
                    <p>District: ${ele[i].District}</p>
                    <p>Division: ${ele[i].Division}</p>        
            `;
            div.className="postOffice";
            div.innerHTML=innerData;
            postDetails.append(div)
            }
            
        })
}

function filterData(){
    let search=document.getElementById("search").value;

}

