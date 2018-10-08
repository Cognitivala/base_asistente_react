import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SideBar from './components/sideBar';
import Settings from './components/settings';
import Home from './components/home';
import _ from 'lodash';
import moment from 'moment';

import {getTotalInteractions, getAverageOperationalTime, getValuations, getFAQ, getCategories, getAssertiveness} from './api.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      interactionsGraph: null,
      faqGraph: null,
      averageOperationalTimeGraph: null,
      valuationsGraph: null,
      assertivenessGraph: null,
      interactionsVariation: null,
      assertivenessVariation: null,
      averageOperationalTimeVariation: null
    };
  }
  componentDidMount() {
  	this.getTotalInteractions("2018-01-01", "2018-12-31", "week");
    this.getAverageOperationalTime("2018-01-01", "2018-12-31");
    this.getFAQ("2018-03-01", "2018-06-30");
    this.getValuations("2018-03-01", "2018-06-30");
    this.getAssertiveness("2018-05-01", "2018-05-30");
    
    this.getTotalInteractionsVariations();
    this.getAssertivenessVariations();
    this.getAverageOperationalTimeVariations();
  }
  getCategories(cb) {
    getCategories((error, data) => {
      if(error) {
        console.log("getCategories error");
        cb(error);
        return console.log(error);
      }
      var toDelete = [];
      data.respuesta.forEach((category, i) => {
        if(category.categoria === "tarjeta de credito") {
          category.short_name = "TC";
          category.color = "#FF795A";
        } else if(category.categoria === "cuenta corriente") {
          category.short_name = "CC";
          category.color = "#4DA1FF";
        } else if(category.categoria === "CAE") {
          category.short_name = "CAE";
          category.color = "#7C4DC4";
        } else if(category.categoria === "") {
          toDelete.push(i);
        } else {
          category.short_name = "-";
          category.color = "black";
        }
      });
      toDelete.forEach(function(i) {
        data.respuesta.splice(i, 1);
      });
      cb(null, data.respuesta);
    });
  }
  getFAQ(start_date, end_date, cb) {
    this.getCategories((error, categories) => {
      if(error) {
          console.log("getCategories error");
          console.log(error);
          if(cb) cb(error);
          return;
      }
      getFAQ(start_date, end_date, (error, data) => {
        if(error) {
          console.log("getFAQ error");
          console.log(error);
          if(cb) cb(error);
          return;
        }
        data.respuesta.forEach((resp) => {
          resp.categoria = _.find(categories, function(cat) {return resp.categoria === cat.categoria});
          console.log(resp);
        });
        var faqGraph = {};
        faqGraph.csv = data.csv;
        faqGraph.data = data.respuesta;
        this.setState({faqGraph, categories}, () => {if(cb) cb()});
      });
    });
  }
  getTotalInteractions(start_date, end_date, period, cb) {
    getTotalInteractions(start_date, end_date, (error, data) => {
      if(error) {
        console.log("getTotalInteractions error");
        console.log(error);
        if(cb) cb(error);
        return;
      }
      var interactionsGraph = {};
      interactionsGraph.csv = data.csv;
      interactionsGraph.data = this.groupDaysBy(data.respuesta, period);
      this.setState({interactionsGraph}, () => {if(cb) cb()});
    });
  }
  getTotalInteractionsVariations() {
    var today = moment();
    var todayNumber = today.format("DD");
    var todayMonthNumber = today.format("MM");
   // console.log("la fecha de hoy seria " + today.format("YYYY-MM-DD"));
   // console.log("el numero de día seria " + todayNumber);
    var this_month_start = moment(today).format("YYYY-MM") +"-01";
    var last_month_start = moment(this_month_start).subtract(1, 'months').format("YYYY-MM-DD");
    var lastMonthNumber = moment(this_month_start).subtract(1, 'months').format("MM");
    var last_last_month_start = moment(this_month_start).subtract(2, 'months').format("YYYY-MM-DD"); 
    var lastLastMonthNumber = moment(this_month_start).subtract(2, 'months').format("MM"); 
   // console.log("numeros de mes: " + todayMonthNumber + " : " + lastMonthNumber + " : " + lastLastMonthNumber);
   // console.log("este mes comienza en " + this_month_start);
   // console.log("el mes pasado comienza en " + last_month_start);
   // console.log("el mes pasado pasado comienza en " + last_last_month_start);
   // console.log("necesitamos pedir los datos desde " + last_last_month_start + " hasta " + today);
    getTotalInteractions(last_last_month_start, today.format("YYYY-MM-DD"), (error, data) => {
      if(error) {
        console.log("getTotalInteractions error");
        console.log(error);       
        return;
      }
      var thisMonthTotal = 0;
      var lastMonthTotal = 0;
      var lastLastMonthTotal = 0;
      data.respuesta.forEach((day) => {
        if(todayNumber >= day.dia) {
          if(day.mes === todayMonthNumber) {
              thisMonthTotal += day.total;
          }
          if(day.mes === lastMonthNumber) {
              lastMonthTotal += day.total;              
          }
          if(day.mes === lastLastMonthNumber) {
              lastLastMonthTotal += day.total;                     
          }
        }
      });
      //console.log("finalmente quedariamos en " + thisMonthTotal + "  " + lastMonthTotal + "  " + lastLastMonthTotal);
      var interactionsVariation = {};
      interactionsVariation.lastMonth = getVariationPct(thisMonthTotal, lastMonthTotal);
      interactionsVariation.lastLastMonth = getVariationPct(thisMonthTotal, lastLastMonthTotal);
      this.setState({interactionsVariation});


    });    
  }
  getAverageOperationalTime(start_date, end_date, cb) {
    getAverageOperationalTime(start_date, end_date, (error, data) => {
      if(error) {
        console.log("getTotalInteractions error");
        console.log(error);
        if(cb) cb(error);
        return;
      }
      var averageOperationalTimeGraph = {};
      averageOperationalTimeGraph.csv = data.csv;
      averageOperationalTimeGraph.data = this.groupDaysBy(data.respuesta, "day", "tmo_segundos");
      this.setState({averageOperationalTimeGraph}, () => {if(cb) cb()});
    }); 
  }
  getAverageOperationalTimeVariations() {
    var today = moment("2018-05-28");
    var todayNumber = today.format("DD");
    var todayMonthNumber = today.format("MM");
   // console.log("la fecha de hoy seria " + today.format("YYYY-MM-DD"));
   // console.log("el numero de día seria " + todayNumber);
    var this_month_start = moment(today).format("YYYY-MM") +"-01";
    var last_month_start = moment(this_month_start).subtract(1, 'months').format("YYYY-MM-DD");
    var lastMonthNumber = moment(this_month_start).subtract(1, 'months').format("MM");
    var last_last_month_start = moment(this_month_start).subtract(2, 'months').format("YYYY-MM-DD"); 
    var lastLastMonthNumber = moment(this_month_start).subtract(2, 'months').format("MM"); 
   // console.log("numeros de mes: " + todayMonthNumber + " : " + lastMonthNumber + " : " + lastLastMonthNumber);
   // console.log("este mes comienza en " + this_month_start);
   // console.log("el mes pasado comienza en " + last_month_start);
   // console.log("el mes pasado pasado comienza en " + last_last_month_start);
   // console.log("necesitamos pedir los datos desde " + last_last_month_start + " hasta " + today);
    getAverageOperationalTime(last_last_month_start, today.format("YYYY-MM-DD"), (error, data) => {
      if(error) {
        console.log("getAverageOperationalTime error");
        console.log(error);       
        return;
      }
      var thisMonthTotal = 0;
      var lastMonthTotal = 0;
      var lastLastMonthTotal = 0;
      var thisMonthCount = 0;
      var lastMonthCount = 0;
      var lastLastMonthCount = 0;
      data.respuesta.forEach((day) => {
        
        if(day.mes === todayMonthNumber) {
            thisMonthTotal += day.tmo_segundos;
            thisMonthCount++;
        }
        if(day.mes === lastMonthNumber) {
            lastMonthTotal += day.tmo_segundos;              
            lastMonthCount++;
        }
        if(day.mes === lastLastMonthNumber) {
            lastLastMonthTotal += day.tmo_segundos;
            lastLastMonthCount++;
        }
        
      });
      
      var thisMonth = 0;
      var lastMonth = 0;
      var lastLastMonth = 0;
      if(thisMonthCount > 0) thisMonth = thisMonthTotal/thisMonthCount;
      if(lastMonthCount > 0) lastMonth = lastMonthTotal/lastMonthCount;
      if(lastLastMonthCount > 0) lastLastMonth = lastLastMonthTotal/lastLastMonthCount;

      
      var averageOperationalTimeVariation = {};
      averageOperationalTimeVariation.lastMonth = secondsToFullTIme(getVariationPct(thisMonth, lastMonth));
      averageOperationalTimeVariation.lastLastMonth = secondsToFullTIme(getVariationPct(thisMonth, lastLastMonth));
      

      this.setState({averageOperationalTimeVariation});


    });    
  }
  getValuations(start_date, end_date, cb) {
    getValuations(start_date, end_date, (error, data) => {
      if(error) {
        console.log("getValuations error");
        console.log(error);
        if(cb) cb(error);
        return;
      }
      var valuationsGraph = {};
      valuationsGraph.csv = data.csv;
      valuationsGraph.data = this.proccessValuations(data.respuesta, "day", "nps");
      this.setState({valuationsGraph}, () => {if(cb) cb()});
    }); 
  }
  proccessValuations(data, by, valueField) {
    if(!valueField) valueField = "total";
    var result2 = {labels: [], nps: [], promotores: [], neutros: [], detractores: []};
    data.forEach((day, i) => {
        var dayDesc = day.dia + " " + getMonthName(day.mes);          
        result2.labels.push(dayDesc);
        result2.nps.push(day.nps);
        result2.promotores.push(day['4'] + day['5']);        
        result2.neutros.push(day['3']);
        result2.detractores.push(day['1'] + day['2']);
    });
      
    return result2;
  }
  getAssertiveness(start_date, end_date, cb) {
   getAssertiveness(start_date, end_date, (error, data) => {
      if(error) {
        console.log("getAssertiveness error");
        console.log(error);
        if(cb) cb(error);
        return;
      }
      var assertivenessGraph = {};
      assertivenessGraph.csv = data.csv;
      assertivenessGraph.data = this.groupDaysBy(data.respuesta, "day", "si");
      var no = this.groupDaysBy(data.respuesta, "day", "no");
      assertivenessGraph.data.values2 = no.values;
      this.setState({assertivenessGraph}, () => {if(cb) cb()});
    }); 
  }
  getAssertivenessVariations() {
    var today = moment("2018-05-28");
    var todayNumber = today.format("DD");
    var todayMonthNumber = today.format("MM");
   // console.log("la fecha de hoy seria " + today.format("YYYY-MM-DD"));
   // console.log("el numero de día seria " + todayNumber);
    var this_month_start = moment(today).format("YYYY-MM") +"-01";
    var last_month_start = moment(this_month_start).subtract(1, 'months').format("YYYY-MM-DD");
    var lastMonthNumber = moment(this_month_start).subtract(1, 'months').format("MM");
    var last_last_month_start = moment(this_month_start).subtract(2, 'months').format("YYYY-MM-DD"); 
    var lastLastMonthNumber = moment(this_month_start).subtract(2, 'months').format("MM"); 
   // console.log("numeros de mes: " + todayMonthNumber + " : " + lastMonthNumber + " : " + lastLastMonthNumber);
   // console.log("este mes comienza en " + this_month_start);
   // console.log("el mes pasado comienza en " + last_month_start);
   // console.log("el mes pasado pasado comienza en " + last_last_month_start);
   // console.log("necesitamos pedir los datos desde " + last_last_month_start + " hasta " + today);
    getAssertiveness(last_last_month_start, today.format("YYYY-MM-DD"), (error, data) => {
      if(error) {
        console.log("getAssertiveness error");
        console.log(error);       
        return;
      }
      var thisMonthTotalSi = 0;
      var lastMonthTotalSi = 0;
      var lastLastMonthTotalSi = 0;
      
      var thisMonthTotalNo = 0;
      var lastMonthTotalNo = 0;
      var lastLastMonthTotalNo = 0;

      data.respuesta.forEach((day) => {
        if(todayNumber >= day.dia) {
          if(day.mes === todayMonthNumber) {
              thisMonthTotalSi += day.si;
              thisMonthTotalNo += day.no;
          }
          if(day.mes === lastMonthNumber) {
              lastMonthTotalSi += day.si;
              lastMonthTotalNo += day.no;
          }
          if(day.mes === lastLastMonthNumber) {
              lastLastMonthTotalSi += day.si;
              lastLastMonthTotalNo += day.no;
          }
        }
      });
      var assertivenessVariation = {};
      assertivenessVariation.lastMonthSi = getVariationPct(thisMonthTotalSi, lastMonthTotalSi);
      assertivenessVariation.lastLastMonthSi = getVariationPct(thisMonthTotalSi, lastLastMonthTotalSi);
      assertivenessVariation.lastMonthNo = getVariationPct(thisMonthTotalNo, lastMonthTotalNo);
      assertivenessVariation.lastLastMonthNo = getVariationPct(thisMonthTotalNo, lastLastMonthTotalNo);
      this.setState({assertivenessVariation});


    });    
  }
  groupDaysBy(data, by, valueField) {
    if(!valueField) valueField = "total";
    var result = [];
    var result2 = {labels: [], values: []};
    if(by === "year") {
      data.forEach((day, i) => {
        var target = _.find(result, function(year) {return year.ano === day.ano});
        if(target) {
          target.total += day[valueField];
        } else {
          result.push({ano: day.ano, total: day[valueField]});
        }
      });
      result.forEach((r) => {
        result2.labels.push(r.ano);
        result2.values.push(r.total);
      });
    }
    if(by === "month") {
      data.forEach((day, i) => {
        var monthDesc = getMonthName(day.mes) + " " + day.ano;
        var target = _.find(result, function(month) {return monthDesc === month.mes});
        if(target) {
          target.total += day[valueField];
        } else {
          result.push({mes: monthDesc, total: day[valueField]});
        }
      });
      result.forEach((r) => {
        result2.labels.push(r.mes);
        result2.values.push(r.total);
      });
    }
    if(by === "week") {
      data.forEach((day, i) => {
        var date = moment(day.ano + "-" + day.mes + "-" + day.dia);        
        var weekDesc = date.week() + " - " + day.ano;          
        var target = _.find(result, function(month) {return weekDesc === month.week});
        if(target) {
          target.total += day[valueField];
        } else {
          result.push({week: weekDesc, total: day[valueField]});
        }
      });
      result.forEach((r) => {
        result2.labels.push(r.week);
        result2.values.push(r.total);
      });
    }
    if(by === "day") {
      data.forEach((day, i) => {
        var dayDesc = day.dia + " " + getMonthName(day.mes);          
          result2.labels.push(dayDesc);
          result2.values.push(day[valueField]);
      });
    }
    return result2;
  }
  render() {
    return (
      <div>
        <Header/>
        <SideBar/>
        <div className="content">
	        <Route exact path="/indicadores" 
			      render={(data)=> 
      				<Home 
                interactionsGraph={this.state.interactionsGraph}
                faqGraph={this.state.faqGraph}
                assertivenessGraph={this.state.assertivenessGraph}
                averageOperationalTimeGraph={this.state.averageOperationalTimeGraph}
                valuationsGraph={this.state.valuationsGraph}
                categories={this.state.categories}

                interactionsVariation={this.state.interactionsVariation}
                assertivenessVariation={this.state.assertivenessVariation}
                averageOperationalTimeVariation={this.state.averageOperationalTimeVariation}

                getTotalInteractions={this.getTotalInteractions.bind(this)}
                getAverageOperationalTime={this.getAverageOperationalTime.bind(this)}
                getFAQ={this.getFAQ.bind(this)}
                getValuations={this.getValuations.bind(this)}
                getAssertiveness={this.getAssertiveness.bind(this)}
              />
		    }/>
		    <Route exact path="/apariencia" 
			      render={(data)=> 
				<h4>APARIENCIA ASISTENTE</h4>
		    }/>
		    <Route exact path="/configurar" 
			      render={(data)=> 
			    <Settings/>
		    }/>
		    <Route exact path="/administrador" 
			      render={(data)=> 
				<h4>ADMINISTRADOR DE USUARIOS</h4>
		    }/>
        </div>
      </div>
    );
  }
}
export default App;
var getMonthName = function(month) {
  if(month === "01") return "Enero";
  if(month === "02") return "Febrero";
  if(month === "03") return "Marzo";
  if(month === "04") return "Abril";
  if(month === "05") return "Mayo";
  if(month === "06") return "Junio";
  if(month === "07") return "Julio";
  if(month === "08") return "Agosto";
  if(month === "09") return "Septiembre";
  if(month === "10") return "Octubre";
  if(month === "11") return "Noviembre";
  if(month === "12") return "Diciembre";
}
var getVariationPct = function(original, other) {
  if(original === 0 || other === 0) return "-";
  var result = 100 - ((other*100)/original);
  return Math.round(result * 10) / 10;
}
var secondsToFullTIme = function(totalSeconds) {
  if(totalSeconds === "-") return "-:-:-"; 
  var hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  var minutes = Math.floor(totalSeconds / 60);
  if(minutes < 0) minutes *= -1;
  if((minutes+"").length === 1) minutes = "0" + minutes;
  var seconds = Math.round(totalSeconds % 60);
  if(seconds < 0) seconds *= -1;
    if((seconds+"").length === 1) seconds = "0" + seconds;

  return hours + ":" + minutes + ":" + seconds;
}