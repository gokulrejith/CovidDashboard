/*
 * Parse the data and create a graph with the data.
 */



function home() {
  window.but = "home";
  window.k = document.getElementById("Home").value;
  document.getElementById("MainHeading1").style.display = "block";
  document.getElementById("contactbox").style.display = "block";
  document.getElementById("contactiv").style.display = "block";
  document.getElementById("MainHeading2").style.display = "none";
  document.getElementById("MainHeading3").style.display = "none";
  document.getElementById("MainHeading4").style.display = "none";
  document.getElementById('m1h').innerHTML = "Kerala — Active cases"
  document.getElementById('g1h').innerHTML = "Kerala ⁠— Date wise Cured & Confirmed cases"
  document.getElementById('g2h').innerHTML = "⁠Kerala — Date wise Deaths "
  document.getElementById('g3h').innerHTML = "⁠Kerala — District wise Distribution"
  document.getElementById('g4h').innerHTML = "⁠Kerala — Quarantine status (Home/Institutional & Hospitalized)"
  document.getElementById('g5h').innerHTML = "Kerala ⁠— Age-wise COVID-19 Deaths"
  document.getElementById("select").style.display = "none";
  document.getElementById("dislen").style.display = "none";
  document.getElementById("stalen").style.display = "block";
  document.getElementById("tab").style.display = "none";
  document.getElementById("map1").style.display = "block";
  document.getElementById("graph1").style.display = "block";
  document.getElementById("pic").style.display = "block";
  document.getElementById("bar1").style.display = "block";
  document.getElementById("graph2").style.display = "block";
  document.getElementById("foot").style.display = "block";
  document.getElementById("pie1").style.display = "block";
  document.getElementById("bara1").style.display = "block";
  document.getElementById("block").style.display = "block";
  document.getElementById("tab2").style.display = "none";
  mapboxgl.accessToken = 'pk.eyJ1IjoiZmlzYXRjb3ZpZGRhc2hib2FyZCIsImEiOiJja2JtNWp2bXkwbTY5MnhwOWVucGNlaTczIn0.Sx3wBju7kBgd1fYxV7fg8g';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/fisatcoviddashboard/ckcc5cr7d6rmx1jmgwi5cqy6j' // replace this with your style URL
    //zoom: 6.4,
    //center: [76.3053, 10.3723] // starting position [lng, lat]
  });
  document.getElementById('fly').addEventListener('click', function () {
    // Fly to a random location by offsetting the point -74.50, 40
    // by up to 5 degrees.
    map.flyTo({
      center: [76.403, 10.414],
      zoom: 6.15,
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
  });

  map.on('mousemove', function (e) {
    var district = map.queryRenderedFeatures(e.point, {
      layers: ['KeralaDistricts']
    });

    if (district.length > 0) {
      document.getElementById('pd').innerHTML = district[0].properties.DISTRICT;
      document.getElementById('px').innerHTML = district[0].properties.Cases + ' Cases';
      console.log(district[0].properties.Cases)
    } else {
      document.getElementById('pd').innerHTML = 'Hover over districts';
      document.getElementById('px').innerHTML = "";

    }
  });
  map.getCanvas().style.cursor = 'default';
  map.fitBounds([
    [74.044885, 12.835487],
    [78.743410, 7.980074]
  ]);
  console.log(k);

  ker(keralaa);


  function ker(keralaa) {
    var c = document.getElementById("cars").value;
    var s = "https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/KeralaData.csv"
    console.log(s);

    Papa.parse(s, {
      download: true,
      complete: function (results) {
        keralaa(results.data);
      }
    });
  }

  function keralaa(data) {
    
    document.getElementById('update').innerHTML = data[1][0]
    document.getElementById('uptime').innerHTML = data[1][1]
    var date = [];
    var cured = ["Recovered"];
    var death = ["Deaths"]
    var confirmed = ["Confirmed"]
    window.cured1 = ["Recovered"];
    window.death1 = ["Deaths"]
    window.confirmed1 = ["Confirmed"]
    var s = 1;
    window.r= ["cured"]
    window.cf= ["Confirmed"]
    window.dea=["Deaths"]
    window.dt=[]
    for (var i = 2; i < data.length - 2; i++) {

      date.push(data[i+1][0]);
      r.push(data[i+1][2]);
      dea.push(data[i+1][3])
      cf.push(data[i+1][1])
      dt.push(data[i+1][0]);



      cured1.push((parseInt(data[i+1][2])-parseInt(data[i][2])));
      death1.push((parseInt(data[i+1][3])-parseInt(data[i][3])))
      confirmed1.push((parseInt(data[i+1][1])-parseInt(data[i][1])))
    }
    window.kercon = parseInt(data[i - 1][1]); //Changed
    var e = document.getElementById("cars").value;
    console.log(e);
    console.log(cured);
    var chart = c3.generate({
      bindto: '#chart',
      data: {
        type: 'area',

        columns: [


          cured1,
          confirmed1


        ]
       
        
      },
      
      color: {
        pattern: [ '#002fff','#3ee61c']
      },
      axis: {
        y: {
          max: 800,
          min: 0,
      },
        x: {
          type: 'category',

          categories: date,
          tick: {
            rotate: 75,
            multiline: false,

            culling: {
              max: 15
            }
          }
        }
      },
      grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    },
      zoom: {
        enabled: true

      },
      legend: {
        position: 'down'
      }
    });
    var chart = c3.generate({
      bindto: '#chart1',
      data: {
        type: 'bar',
        columns: [

          death1,



        ]
      },
      color: {
        pattern: ['#940000']
      },
      axis: {
        x: {
          type: 'category',
          categories: date,
          tick: {
            rotate: 75,
            multiline: false,

            culling: {
              max: 15
            }
          }
        }
      },
      grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    },
      zoom: {
        enabled: true

      },
      legend: {
        position: 'down'
      }
    });
 function conta(contadata) {

    Papa.parse("https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/Containment.csv", {
      download: true,
      complete: function(results) {
        contadata(results.data);
      }
    });
  }

  function contadata(data) {

    window.conname = ['District'];
    window.conlsg = ["LSGs needing special attention"];
    window.conwa = ["Containment Zones - ward"];



    var s = "Palakkad";
    for (var i = 1; i < data.length - 1; i++) {
      conname.push(data[i][1]);
      conlsg.push(data[i][2])
      conwa.push(data[i][3])





    }

  }


  contacttable(contacttabledata);

  function contacttable(contacttabledata) {

    Papa.parse("https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/contact.csv", {
      download: true,
      complete: function(results) {
        contacttabledata(results.data);
      }
    });
  }

  function contacttabledata(data) {

    window.contactdisname = [];
    window.contactnum = ["Contact"];
    window.importnum= ["Import"];
   

    for (var i = 1; i < data.length - 2; i++) {
      contactdisname.push(data[i][0]);
      contactnum.push(data[i][1])
      importnum.push(data[i][2])

    }
    var html = "<table border='1|1'>";
    html+="<tr>";
    
    html+="<th>"+contactdisname[0]+"</th>";
    html+="<th>"+contactnum[0]+"</th>";
    html+="<th>"+importnum[0]+"</th>";
    html+="</tr>";
    for (var i = 1; i <=contactdisname.length; i++) {
     
        
      html+="<tr>";
     
      html+="<td>"+contactdisname[i-1]+"</td>";
      html+="<td>"+contactnum[i]+"</td>";
      html+="<td>"+importnum[i]+"</td>";
  
      html+="</tr>";
  
  
  j=0;}
  html+="</table>";
  document.getElementById("contacttable").innerHTML = html;
  var h=["Contact"]
  var ll=["Import"]

  var chart = c3.generate({
    bindto: '#contactpie',
    data: {
      type: 'bar',
      columns: [

        contactnum,importnum



      ]
    },
    color: {
      pattern: ['#203e7e', '#328d3e']
    },
    axis: {
      x: {
        type: 'category',
        categories: contactdisname,
        tick: {
          rotate: 75,
          multiline: false,

          
        }
      }
    },
    grid: {
      x: {
          show: true
      },
      y: {
          show: true
      }
  },
    zoom: {
      enabled: true

    },
    legend: {
      position: 'down'
    }
  });
  

  }






    //bar.......open
    ker(kerbar);

    function ker(keralaa) {
      var c = document.getElementById("cars").value;


      Papa.parse("https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/QuarKerDist.csv", {
        download: true,
        complete: function (results) {
          kerbar(results.data);
        }
      });
    }

    function kerbar(data) {

      var district = ['x'];
      var Home = ["Home/Institutional"];
      var Hospitalized = ["Hospitalized"]

      var s = 1;
      for (var i = 1; i < data.length - 1; i++) {
        district.push(data[i][0]);
        Hospitalized.push(data[i][1])
        Home.push(data[i][2])

      }
      var chart = c3.generate({
        bindto: '#bar2',
        data: {
          x: 'x',

          columns: [
            district, Hospitalized, Home

          ],
          type: 'bar'

        },
        grid: {
          x: {
              show: true
          },
          y: {
              show: true
          }
      },
        color: {
          pattern: ['#fd0202', '#fde402']
        },
        axis: {

          x: {
            type: 'category',
            tick: {
              rotate: 75,
              multiline: false,

            }

          }
        },
      });

    }



    //bar......close
    //bar age.......open
    kerage(kerbarage);

    function kerage(kerbarage) {

      Papa.parse("https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/PatientDeathAge.csv", {
        download: true,
        complete: function (results) {
          kerbarage(results.data);
        }
      });
    }

    function kerbarage(data) {

      var age = ['x'];
      var death = ["Deaths"];


      var s = 1;
      for (var i = 1; i < data.length - 1; i++) {
        age.push(data[i][0]);
        death.push(data[i][1])


      }
      var chart = c3.generate({
        bindto: '#bara2',
        data: {
          x: 'x',

          columns: [
            age, death

          ],
          type: 'bar'

        },
        grid: {
          x: {
              show: true
          },
          y: {
              show: true
          }
      },
        color: {
          pattern: ['#614e6e']
        },
        axis: {

          x: {
            type: 'category'




          }
        },
      });

    }

    //bar age close/////



    //pie kerala.......open
    kerpie(kerpiedata);

    function kerpie(kerpiedata) {

      Papa.parse("https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/DistrictData.csv", {
        download: true,
        complete: function (results) {
          kerpiedata(results.data);
        }
      });
    }

    function kerpiedata(data) {
      var disname = []
      var discase = []

      for (var i = 1; i < data.length - 1; i++) {
        disname.push(data[i][0]);
        discase.push(data[i][1])



      }
      var chart = c3.generate({
        bindto: '#pie',
        data: {
          // iris data from R
          rows: [
            disname, discase


          ],
          grid: {
            x: {
                show: true
            },
            y: {
                show: true
            }
        },
          type: 'pie',
          onclick: function (d, i) {
            console.log("onclick", d, i);
          },
          onmouseover: function (d, i) {
            console.log("onmouseover", d, i);
          },
          onmouseout: function (d, i) {
            console.log("onmouseout", d, i);
          }
        },
        legend: {
          position: 'right'
        }

      });



    }

    //pie kerala close/////



    var sum = (parseInt(data[i][4]) - parseInt(data[i - 1][4])).toString();
    var sum1 = "+" + "(" + sum + ")"
    var co = (parseInt(data[i][1]) - parseInt(data[i - 1][1])).toString();
    var coo = "+" + "(" + co + ")"
    var cu = (parseInt(data[i][2]) - parseInt(data[i - 1][2])).toString();
    var cuu = "+" + "(" + cu + ")"
    var de = (parseInt(data[i][3]) - parseInt(data[i - 1][3])).toString();
    var dee = "+" + "(" + de + ")"
    var cont="+" + "(" + data[i][6] + ")"

    document.getElementById("Active1").innerHTML = "";
    document.getElementById("contact").innerHTML = cont;
    document.getElementById("cured1").innerHTML = cuu;
    document.getElementById("death1").innerHTML = dee;
    document.getElementById("confirmed1").innerHTML = coo;
    document.getElementById("Active").innerHTML = data[i][4];
    document.getElementById("cured").innerHTML = data[i][2];
    document.getElementById("death").innerHTML = data[i][3];
    document.getElementById("confirmed").innerHTML = data[i][1];

  }



  console.log(k);

  com();
}

function world() {
  document.getElementById('g5h').innerHTML = "Top Countries ⁠— Recovered, Confirmed & Deaths"
  document.getElementById("contactbox").style.display = "none";
  window.but = "world";
  var select = document.getElementById("cars");
  select.options.length = 0;
  document.getElementById("tab2").style.display = "none";
  window.k = document.getElementById("WorldS").value;
  document.getElementById("tab").style.display = "block";
  document.getElementById("map1").style.display = "none";
  document.getElementById("graph1").style.display = "none";
  document.getElementById("bar1").style.display = "none";
  document.getElementById("graph2").style.display = "none";
  document.getElementById("pie1").style.display = "none";
  document.getElementById("select").style.display = "none";
  document.getElementById("pic").style.display = "none";
  document.getElementById("foot").style.display = "none";
  document.getElementById("block").style.display = "none";
  document.getElementById("bara1").style.display = "block";
  document.getElementById("MainHeading1").style.display = "none";
  document.getElementById("MainHeading2").style.display = "none";
  document.getElementById("MainHeading3").style.display = "none";
  document.getElementById("MainHeading4").style.display = "block";
  console.log(k);





  //top 10 bar open....


  worldtop(worlddata);

  function worldtop(worlddata) {


    Papa.parse("https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/WorldDataTop10.csv", {
      download: true,
      complete: function (results) {
        worlddata(results.data);
      }
    });
  }

  function worlddata(data) {

    var country = ['x'];
    var cases = ["Confirmed"];
    var deaths = ["Deaths"];
    var recovered = ["Recovered"];


    var s = 1;
    for (var i = 1; i < data.length - 1; i++) {
      country.push(data[i][0]);
      cases.push(data[i][1])
      deaths.push(data[i][2])
      recovered.push(data[i][3])
      var c = i + 10
      var d = i + 20
      var e = i + 30
      document.getElementById(i).innerHTML = data[i][0];
      document.getElementById(c).innerHTML = data[i][1];
      document.getElementById(d).innerHTML = data[i][2];
      document.getElementById(e).innerHTML = data[i][3];


    }
    var chart = c3.generate({
      bindto: '#bara2',
      data: {
        x: 'x',

        columns: [
          country, cases, recovered, deaths

        ],
        grid: {
          x: {
              show: true
          },
          y: {
              show: true
          }
      },
        type: 'bar'

      },
      color: {
        pattern: ['#203e7e', '#328d3e', '#ff0000']
      },
      axis: {

        x: {
          type: 'category',
          tick: {
            rotate: 75,
            multiline: false,

          }

        }
      },
      grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }}
    });

  }


  //top 10 bar closs

  com();
}

function dis() {
  document.getElementById("contactbox").style.display = "none";
  window.but = "district";
  var select = document.getElementById("cars");
  select.options.length = 0;
  var ppp = document.getElementById("cars").value;
document.getElementById("contactiv").style.display = "none";
  document.getElementById('m1h').innerHTML = "Kerala — Active Cases"
  document.getElementById("tab2").style.display = "block";
  document.getElementById("MainHeading1").style.display = "none";
  document.getElementById("MainHeading2").style.display = "block";
  document.getElementById("MainHeading3").style.display = "none";
  document.getElementById("MainHeading4").style.display = "none";
  document.getElementById('g3h').innerHTML = "District Distribution"
  document.getElementById("dislen").style.display = "block";
  document.getElementById("stalen").style.display = "none";
  window.k = document.getElementById("District Wise").value;
  document.getElementById("tab").style.display = "block";
  document.getElementById("map1").style.display = "block";
  document.getElementById("graph1").style.display = "block";
  document.getElementById("bar1").style.display = "none";
  document.getElementById("graph2").style.display = "block";
  document.getElementById("select").style.display = "block";
  document.getElementById("pic").style.display = "none";
  document.getElementById("foot").style.display = "none";
  document.getElementById("pie1").style.display = "block";
  document.getElementById("block").style.display = "block";
  document.getElementById("bara1").style.display = "none";
  //map.........
  mapboxgl.accessToken = 'pk.eyJ1IjoiZmlzYXRjb3ZpZGRhc2hib2FyZCIsImEiOiJja2JtNWp2bXkwbTY5MnhwOWVucGNlaTczIn0.Sx3wBju7kBgd1fYxV7fg8g';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/fisatcoviddashboard/ckcc5cr7d6rmx1jmgwi5cqy6j' // replace this with your style URL
    //zoom: 6.4,
    //center: [76.3053, 10.3723] // starting position [lng, lat]
  });
  document.getElementById('fly').addEventListener('click', function () {
    // Fly to a random location by offsetting the point -74.50, 40
    // by up to 5 degrees.
    map.flyTo({
      center: [76.403, 10.414],
      zoom: 6.15,
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
  });

  map.on('mousemove', function (e) {
    var district = map.queryRenderedFeatures(e.point, {
      layers: ['KeralaDistricts']
    });

    if (district.length > 0) {
      document.getElementById('pd').innerHTML = district[0].properties.DISTRICT;
      document.getElementById('px').innerHTML = district[0].properties.Cases + ' Cases';
      console.log(district[0].properties.Cases)
    } else {
      document.getElementById('pd').innerHTML = 'Hover over districts';
      document.getElementById('px').innerHTML = "";

    }
  });
  map.getCanvas().style.cursor = 'default';
  map.fitBounds([
    [74.044885, 12.835487],
    [78.743410, 7.980074]
  ]);
  console.log(k);

  disr(creee);


  function disr(creee) {
    var c = document.getElementById("cars").value;
    var s = "https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/DistrictData.csv"
    console.log(s);

    Papa.parse(s, {
      download: true,
      complete: function (results) {
        creee(results.data);
      }
    });
  }

  function creee(data) {

    for (var i = 1; i < 11; i++) {

      var c = i + 10
      var d = i + 20
      var e = i + 30
      document.getElementById(i).innerHTML = data[i][0];
      document.getElementById(c).innerHTML = data[i][1];
      document.getElementById(d).innerHTML = data[i][3];
      document.getElementById(e).innerHTML = data[i][2];

    }

  }
  conta(contadata);
  function conta(contadata) {

    Papa.parse("https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/Containment.csv", {
      download: true,
      complete: function(results) {
        contadata(results.data);
      }
    });
  }

  function contadata(data) {

    window.conname = ['District'];
    window.conlsg = ["LSGs needing special attention"];
    window.conwa = ["Containment Zones - ward"];

var ii=""

    var s = "Palakkad";
    for (var i = 1; i < data.length - 1; i++) {
      conname.push(data[i][1]);
      conlsg.push(data[i][2])
      
     
      for (var j = 3; j < data[i].length; j++) {
        if(ii=="")
        {ii=ii+((data[i][j]).toString())}
        else{
        ii=ii+","+((data[i][j]).toString())
      }
console.log(ii)
      }
      
      conwa.push(ii)
ii=""
    }

  }
  com();
}

function sta() {
  document.getElementById("contactbox").style.display = "none";
  window.but = "state";
  var select = document.getElementById("cars");
  select.options.length = 0;
  var ppp = document.getElementById("cars").value;
  document.getElementById("contactiv").style.display = "none";
  document.getElementById('m1h').innerHTML = "India ⁠— State wise Active cases"
  document.getElementById("tab2").style.display = "none";
  document.getElementById("MainHeading1").style.display = "none";
  document.getElementById("MainHeading2").style.display = "none";
  document.getElementById("MainHeading3").style.display = "block";
  document.getElementById("MainHeading4").style.display = "none";
  document.getElementById('g2h').innerHTML = "India ⁠— State wise Distribution"
  document.getElementById('g5h').innerHTML = "Top States ⁠— Recovered, Confirmed & Deaths"
  window.k = document.getElementById("State wise").value;
  document.getElementById("tab").style.display = "block";
  document.getElementById("map1").style.display = "block";
  document.getElementById("graph1").style.display = "none";
  document.getElementById("bar1").style.display = "none";
  document.getElementById("graph2").style.display = "block";
  document.getElementById("select").style.display = "block";
  document.getElementById("pic").style.display = "none";
  document.getElementById("foot").style.display = "none";
  document.getElementById("pie1").style.display = "none";
  document.getElementById("block").style.display = "block";
  document.getElementById("bara1").style.display = "block";
  console.log(k);

  state(cree);


  function state(cree) {

    var s = "https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/StateDataTop10.csv"
    console.log(s);

    Papa.parse(s, {
      download: true,
      complete: function (results) {
        cree(results.data);
      }
    });
  }

  function cree(data) {




    for (var i = 1; i < 11; i++) {

      var c = i + 10
      var d = i + 20
      var e = i + 30
      document.getElementById(i).innerHTML = data[i][0];
      document.getElementById(c).innerHTML = data[i][1];
      document.getElementById(e).innerHTML = data[i][2];
      document.getElementById(d).innerHTML = data[i][3];
    }

  }

  mapboxgl.accessToken = 'pk.eyJ1IjoiZmlzYXRjb3ZpZGRhc2hib2FyZCIsImEiOiJja2JtNWp2bXkwbTY5MnhwOWVucGNlaTczIn0.Sx3wBju7kBgd1fYxV7fg8g';
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/fisatcoviddashboard/ckcc5kyqx558z1ileglbgrjiy' // replace this with your style URL
    //zoom: 6.4,
    //center: [76.3053, 10.3723] // starting position [lng, lat]
  });
  document.getElementById('fly').addEventListener('click', function () {
    // Fly to a random location by offsetting the point -74.50, 40
    // by up to 5 degrees.
    map.flyTo({
      center: [78.94, 23.12],
      zoom: 3.45,
      essential: true // this animation is considered essential with respect to prefers-reduced-motion
    });
  });

  map.on('mousemove', function (e) {
    var state = map.queryRenderedFeatures(e.point, {
      layers: ['IndiaStates']
    });

    if (state.length > 0) {
      document.getElementById('pd').innerHTML = state[0].properties.st_nm;
      document.getElementById('px').innerHTML = state[0].properties.Cases + ' Cases';
      console.log(state[0].properties.Cases)
    } else {
      document.getElementById('pd').innerHTML = 'Hover over states';
      document.getElementById('px').innerHTML = "";
    }
  });
  map.getCanvas().style.cursor = 'default';
  map.fitBounds([
    [67.224185, 37.342192],
    [98.598166, 7.329635]
  ]);
  indiapie(indiapiedata);

  function indiapie(indiapiedata) {

    Papa.parse("https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/StateDataTop10.csv", {
      download: true,
      complete: function (results) {
        indiapiedata(results.data);
      }
    });
  }

  function indiapiedata(data) {
    var statename = []
    var statecase = ["Confirmed"]
    var statecured = ["Deaths"]
    var statedeath = ["Recovered"]
    var name = ['x'];

    for (var i = 1; i < 11; i++) {
      statename.push(data[i][0]);
      statecase.push(parseInt(data[i][1]))
      statecured.push(parseInt(data[i][3]))
      statedeath.push(parseInt(data[i][2]))
      name.push(data[i][0]);

      console.log(statecase)
    }
    console.log(statecase)
    var chart = c3.generate({
      bindto: '#bara2',
      data: {
        x: 'x',

        columns: [
          name, statecase, statedeath, statecured

        ],
        grid: {
          x: {
              show: true
          },
          y: {
              show: true
          }
      },
        type: 'bar',


      },
      color: {
        pattern: ['#355b68', '#328d3e', '#ff0000']
      },

      axis: {

        x: {
          type: 'category',
          tick: {
            rotate: 75,
            multiline: false,
          }




        }
      },
      grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }}
    });


  }

  com();

}

function com() {
  var x = window.matchMedia("(max-width: 568px)")
  myFunction(x)
  x.addListener(myFunction)

  function myFunction(x) {
    if (x.matches) { // If media query matches
      document.getElementById("navbar").style.display = "none";
      document.getElementById("myOverlay").style.display = "none";
    } else {
      document.getElementById("navbar").style.display = "block";
    }
  }

  if (k == "State wise") {
    console.log("sta");
    document.getElementById("ch").innerHTML = "State";
    document.getElementById("top").innerHTML = "States";
    document.getElementById("head").innerHTML = "State";
    console.log("sta");
    stasel();
  } else if (k == "District Wise") {
    document.getElementById("ch").innerHTML = "District";
    document.getElementById("top").innerHTML = "Districts";
    document.getElementById("head").innerHTML = "District";
    dissel();
  } else if (k == "WorldS") {
    document.getElementById("ch").innerHTML = "Country";
    document.getElementById("top").innerHTML = "Countries";
    document.getElementById("head").innerHTML = "Country";
    console.log("wo");
  } else if (k == "Home") {
    console.log("ho");
  }


}

function dissel() {

  var array = ["Palakkad", "Kannur",
    "Kasargode", "Kozhikode", "Thiruvananthapuram", "Kollam", "Kottayam",
    "Wayanad", "Malappuram", "Alappuzha", "Ernakulam", "Idukki", "Pathanamthitta",
    "Thrissur"
  ];
  for (var i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", array[i]);
    option.text = array[i];
    cars.appendChild(option);


  }


  parseData();

}


function stasel() {

  var array = ["Andhra Pradesh", "Arunachal Pradesh",
    "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
    "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telengana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];
  for (var i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", array[i]);
    option.text = array[i];
    cars.appendChild(option);
    console.log("dcdc")


  }


  parseData();


}

function parseData() {
  if (but == "district") {
    console.log("dsds")
    displot(displotdata);
  }
  if (but == "state") {
    console.log("dsdsjn,n")
    stateplot(stateplotdata);

  }
}


function displot(displotdata) {
  var c = document.getElementById("cars").value;
  document.getElementById('g1h').innerHTML = (c + " ⁠— Date wise Confirmed & Recovered cases")

  document.getElementById('g2h').innerHTML = (c + " ⁠— Date wise Deaths")

  var s = "https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/DistrictDatewise.csv"
  console.log(s);

  Papa.parse(s, {
    download: true,
    complete: function (results) {
      displotdata(results.data);
    }
  });
}

function displotdata(data) {
  var c = document.getElementById("cars").value;

  var date = [];
 window.dcured = ["Recovered"];
 window.ddeath = ["Deaths"]
 window.dconfirmed = ["Confirmed"]
 window.recumt = ["Recovered"];
 window.decumt = ["Deaths"]
 window.cocumt = ["Confirmed"]
 window.disd = [];
  var s = 1;
  for (var i = 1; i < data.length - 1; i++) {
    if ((data[i][0]) == c) {
      var q = i;
      console.log("dfds");
      console.log(q);
      if ((data[i - 1][0]) != (data[i][0])) {
        var t = i;

      }
    }

  }
  console.log(t);
  console.log(q);

  var cocum = 0
  var decum = 0
  var recum = 0
  for (var i = t; i <= q; i++) {
    cocum = cocum + parseInt(data[i][2])
    cocumt.push(data[i][2])

    decum = decum + parseInt(data[i][5])
    decumt.push(data[i][5])
    recum = recum + parseInt(data[i][3])
    recumt.push(data[i][3])
    date.push(data[i][1]);
    dcured.push(recum);
    ddeath.push(decum)
    dconfirmed.push(cocum)
    disd.push(data[i][1]);
  }
  var e = document.getElementById("cars").value;

  console.log(cured);

  var chart = c3.generate({
    bindto: '#chart',
    data: {
      type: 'area',
      columns: [


        dcured,
        dconfirmed


      ]
    },
    grid: {
      x: {
          show: true
      },
      y: {
          show: true
      }
  },
    color: {
      pattern: ['#002fff', '#3ee61c']
    },
    axis: {
      x: {
        type: 'category',
        categories: date,
        tick: {
          rotate: 75,
          multiline: false,

          culling: {
            max: 15
          }
        }
      }
    },
    zoom: {
      enabled: true

    },
    legend: {
      position: 'down'
    }
  });
  var chart = c3.generate({
    bindto: '#chart1',
    data: {
      type: 'bar',
      columns: [

        decumt



      ]
    },
    grid: {
      x: {
          show: true
      },
      y: {
          show: true
      }
  },
    color: {
      pattern: ['#940000']
    },
    axis: {
      x: {
        type: 'category',
        categories: date,
        tick: {
          rotate: 75,
          multiline: false,

          culling: {
            max: 15
          }
        }
      }
    },
    zoom: {
      enabled: true

    },
    legend: {
      position: 'down'
    }
  });
  var chart = c3.generate({
    bindto: '#pie',
    data: {
      // iris data from R
      columns: [
        [e, cocum],
        ['Other states', kercon - cocum], //changed
      ],
      type: 'pie',
      onclick: function (d, i) {
        console.log("onclick", d, i);
      },
      onmouseover: function (d, i) {
        console.log("onmouseover", d, i);
      },
      onmouseout: function (d, i) {
        console.log("onmouseout", d, i);
      }
    },
    color: {
      pattern: ['#ff8800', '#203e7e']
    },
    legend: {
      position: 'right'
    }

  });





  var acc = "+" + "(" + (data[q][4]) + ")"

  var coo = "+" + "(" + (data[q][2]) + ")"

  var cuu = "+" + "(" + (data[q][3]) + ")"

  var dee = "+" + "(" + (data[q][5]) + ")"

  document.getElementById("Active1").innerHTML = "";
  document.getElementById("cured1").innerHTML = cuu;
  document.getElementById("death1").innerHTML = dee;
  document.getElementById("confirmed1").innerHTML = coo;
  document.getElementById("Active").innerHTML = (data[q][4]);
  document.getElementById("cured").innerHTML = recum;
  document.getElementById("death").innerHTML = decum;
  document.getElementById("confirmed").innerHTML = cocum;
  var e = document.getElementById("cars").value;
  for (var i = 1; i < conname.length - 1; i++) {
    if ((conname[i]) == e) {
      var q = i;
      console.log("dfds");
      console.log(q);
      if ((conname[i-1]) != (conname[i])) {
        var t = i;

      }
    }}
  var html = "<table border='1|1'>";
  html+="<tr>";
  
  html+="<th>"+conlsg[0]+"</th>";
  html+="<th>"+conwa[0]+"</th>";
  html+="</tr>";
  for (var i = t; i <=q; i++) {
   
      
    html+="<tr>";
   
    html+="<td>"+conlsg[i]+"</td>";
    html+="<td>"+conwa[i]+"</td>";

    html+="</tr>";


j=0;}
html+="</table>";
document.getElementById("customers1").innerHTML = html;





}







function stateplot(stateplotdata) {
  var c = "Kerala";

  var s = "https://raw.githubusercontent.com/fisatcoviddashboard/COVID-Dashboard/master/StateData.csv"


  Papa.parse(s, {
    download: true,
    complete: function (results) {
      stateplotdata(results.data);
    }
  });
}

function stateplotdata(data) {
  var e = document.getElementById("cars").value;

  var death = ["Deaths"]
  var confirmed = ["Confirmed"]
  var sum = 0;
  for (var i = 1; i < data.length - 1; i++) {
    if ((data[i][0]) == e) {
      var q = i;

    }
    sum = sum + parseInt(data[i][4])
  }



  var chart = c3.generate({
    bindto: '#chart1',
    data: {
      // iris data from R
      columns: [
        [e, parseInt(data[q][4])],
        ['Other states', sum - parseInt(data[q][4])],
      ],
      type: 'pie',
      onclick: function (d, i) {
        console.log("onclick", d, i);
      },
      onmouseover: function (d, i) {
        console.log("onmouseover", d, i);
      },
      onmouseout: function (d, i) {
        console.log("onmouseout", d, i);
      }
    },
    color: {
      pattern: ['#ff8800', '#203e7e']
    },
    legend: {
      position: 'right'
    }

  });

  document.getElementById("Active1").innerHTML = "";
  document.getElementById("cured1").innerHTML = "";
  document.getElementById("death1").innerHTML = "";
  document.getElementById("confirmed1").innerHTML = "";
  document.getElementById("Active").innerHTML = data[q][1];
  document.getElementById("cured").innerHTML = data[q][2];
  document.getElementById("death").innerHTML = data[q][3];
  document.getElementById("confirmed").innerHTML = data[q][4];


}






  function lee() {
  
 
  console.log(cured);
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      type: 'area',

      columns: [


        r,
        cf


      ]
     
      
    },
    
    color: {
      pattern: [ '#002fff','#3ee61c',]
    },
    axis: {

      x: {
        type: 'category',

        categories: dt,
        tick: {
          rotate: 75,
          multiline: false,

          culling: {
            max: 15
          }
        }
      }
    },
    grid: {
      x: {
          show: true
      },
      y: {
          show: true
      }
  },
    zoom: {
      enabled: true

    },
    legend: {
      position: 'down'
    }
  });}



  function dai(){
    var chart = c3.generate({
      bindto: '#chart',
      data: {
        type: 'area',

        columns: [


          cured1,
          confirmed1


        ]
       
        
      },
      
      color: {
        pattern: [ '#002fff','#3ee61c',]
      },
      axis: {

        x: {
          type: 'category',

          categories: dt,
          tick: {
            rotate: 75,
            multiline: false,

            culling: {
              max: 15
            }
          }
        }
      },
      grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    },
      zoom: {
        enabled: true

      },
      legend: {
        position: 'down'
      }
    });
  }
  


  function leee() {
  
 
    console.log(cured);
    var chart = c3.generate({
      bindto: '#chart',
      data: {
        type: 'area',
  
        columns: [
  
  
          dcured,
          dconfirmed
  
  
        ]
       
        
      },
      
      color: {
        pattern: [ '#002fff','#3ee61c']
      },
      axis: {
  
        x: {
          type: 'category',
  
          categories: dt,
          tick: {
            rotate: 75,
            multiline: false,
  
            culling: {
              max: 15
            }
          }
        }
      },
      grid: {
        x: {
            show: true
        },
        y: {
            show: true
        }
    },
      zoom: {
        enabled: true
  
      },
      legend: {
        position: 'down'
      }
    });}
  
  
  
    function daii(){
      var chart = c3.generate({
        bindto: '#chart',
        data: {
          type: 'area',
  
          columns: [
  
  
            recumt,
            cocumt
  
  
          ]
         
          
        },
        
        color: {
          pattern: [ '#002fff','#3ee61c']
        },
        axis: {
  
          x: {
            type: 'category',
  
            categories: disd,
            tick: {
              rotate: 75,
              multiline: false,
  
              culling: {
                max: 15
              }
            }
          }
        },
        grid: {
          x: {
              show: true
          },
          y: {
              show: true
          }
      },
        zoom: {
          enabled: true
  
        },
        legend: {
          position: 'down'
        }
      });
    }
    