import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

import "leaflet/dist/leaflet.css";
import L from "leaflet";



const StudyCenters = () => {


  if (Platform.OS === "web") {

    return <WebMap />;

  }



  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Nearby Study Centers
      </Text>


      <Text>
        Map available on web version.
      </Text>


    </View>

  );

};






// Custom Marker Design

const createStudyIcon = (emoji) => {


  return L.divIcon({

    className: "custom-marker",

    html: `

      <div style="
        width:45px;
        height:45px;
        background:#2563eb;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        display:flex;
        align-items:center;
        justify-content:center;
        box-shadow:0px 4px 10px rgba(0,0,0,0.3);
      ">

        <div style="
          transform:rotate(45deg);
          font-size:24px;
        ">
          ${emoji}
        </div>

      </div>

    `,


    iconSize:[45,45],

    iconAnchor:[22,45],

    popupAnchor:[0,-40]


  });


};







function WebMap(){


  const ReactLeaflet = require("react-leaflet");


  const {
    MapContainer,
    TileLayer,
    Marker,
    Popup
  } = ReactLeaflet;




  const centers=[


    {

      id:1,

      name:"EduMate Study Hub",

      description:"Silent study rooms + Digital Library",

      emoji:"📚",

      lat:22.5726,

      lng:88.3639

    },



    {

      id:2,

      name:"Knowledge Point Library",

      description:"24/7 competitive exam preparation",

      emoji:"🎓",

      lat:22.5740,

      lng:88.3655

    },



    {

      id:3,

      name:"Bright Future Academy",

      description:"Coding and technical courses",

      emoji:"💻",

      lat:22.5705,

      lng:88.3615

    }


  ];





  return (

    <View style={styles.container}>


      <Text style={styles.heading}>
        Nearby Study Centers
      </Text>




      <div
        style={{
          height:"80%",
          width:"100%",
          borderRadius:"15px",
          overflow:"hidden"
        }}
      >



        <MapContainer


          center={[
            22.5726,
            88.3639
          ]}


          zoom={15}


          style={{

            height:"100%",

            width:"100%"

          }}


        >




          <TileLayer

            url=
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png"

          />





          {
            centers.map((center)=>(


              <Marker


                key={center.id}


                position={[

                  center.lat,

                  center.lng

                ]}


                icon={
                  createStudyIcon(center.emoji)
                }


              >



                <Popup>


                  <div

                    style={{

                      padding:"10px",

                      minWidth:"180px"

                    }}

                  >


                    <h3

                      style={{

                        margin:"0",

                        color:"#2563eb",

                        fontSize:"16px"

                      }}

                    >

                      {center.name}

                    </h3>




                    <p

                      style={{

                        color:"#475569",

                        marginTop:"8px"

                      }}

                    >

                      {center.description}

                    </p>




                    <button

                      style={{

                        background:"#2563eb",

                        color:"white",

                        border:"none",

                        padding:"8px 15px",

                        borderRadius:"8px",

                        cursor:"pointer"

                      }}

                    >

                      View Centre

                    </button>



                  </div>



                </Popup>



              </Marker>



            ))
          }





        </MapContainer>



      </div>



    </View>

  );


}






export default StudyCenters;






const styles = StyleSheet.create({


container:{


flex:1,


padding:15,


backgroundColor:"#f8fafc"


},




heading:{


fontSize:24,


fontWeight:"bold",


color:"#2563eb",


textAlign:"center",


marginBottom:15


}


});