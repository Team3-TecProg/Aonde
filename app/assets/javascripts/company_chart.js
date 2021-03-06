function drawCompany(path,dataCompany){
  $('#'+COMPANY+"."+CHART).empty();
  dataCompany = preProcess(dataCompany);
  $('#'+COMPANY+'.'+CHART).highcharts({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: true,
        height: 580
    },
    title: {
        text: 'Empresas',
        align: 'center',
        verticalAlign: 'middle',
        y: 150,
        x: 0,
        style: {
            color: 'black',
            fontWeight: 'bold',
            fontFamily: 'Times New Roman',
            fontSize: '60px'
        }
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.3f}%</b>'
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: true,
                distance: 30,
                style: {
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: '12px'
                }
            },
            startAngle: -100,
            endAngle: 100,
            center: ['50%', '65%']
        },
        series: {
          cursor: 'crosshair',
          point: {
            events: {
              click: function(){
                removePointToList(this,COMPANY);
              }
            }
          }
        }
    },
    series: [{
        type: 'pie',
        size: '100%',
        name: 'Porcentagem',
        innerSize: '50%',
        data: dataCompany

    }]
  });
  showFilter(path,COMPANY,updateCompany);
}

function updateCompany(path,data){
  var chart = $('#'+COMPANY+"."+CHART).highcharts();
  if( chart != undefined){
    if ( chart.series[0].points.length && data.length){
      chart.series[0].points.forEach(function(point){
        var sizeData = data.length;
        var i = 0;
        var found = false;
        do{
          if (data[i][0] === point.name ){
            found = true; 
            console.debug("found"+data[i][0]+" == "+point.name);
          }
        }while( !found && ++i < sizeData );
        if (found){
          point.y+=data[i][1];
          data.remove(i,1);
        }      
      });
      data.forEach(function(element){
        chart.series[0].addPoint(element);
      });
    }else{
      data.forEach(function(element){
        chart.series[0].addPoint(element);
      });
    }
  }else{
    console.error("No graph ploted");
  } 
  chart.render();
}

function preProcess(data){
  console.debug(data);
  newData = []
  var numberCompanies = 0;
  var sizeData = data.length;
  while(numberCompanies < sizeData && numberCompanies < LIMITCOMPANY){
    console.debug(data[numberCompanies]);
    console.debug(numberCompanies);
    
    newData.push(data[numberCompanies]);
    
    numberCompanies++;
  }

  if(sizeData!=numberCompanies){
    outros = ["Outras empresas",0];
    while(sizeData > numberCompanies){
      outros[1] += data[numberCompanies][1];
      numberCompanies++;
    }
    newData.push(outros);
  }
  console.debug(newData);
  return newData;
}