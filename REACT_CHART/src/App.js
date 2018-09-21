import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import SideBar from './components/sideBar';
import Settings from './components/settings';
import Home from './components/home';
import _ from 'lodash';
import moment from 'moment';

import {getTotalInteractions, getAverageOperationalTime, getValuations, getFAQ, getCategories, getAssertiveness, getDetailInteractions, getDetailSesiones} from './api.js';
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

      interactionsLoading: false,
      faqLoading: false,
      averageOperationalTimeLoading: false,
      valuationsLoading: false,
      assertivenessLoading: false,

      detailInteractionsGraph: null,
      detailSesionesGraph: null,
      detailsLoading: false
    };
  }
  componentDidMount() {
    var today = moment().format("YYYY-MM-DD");
    var weekAgo = moment().subtract(7, 'days').format("YYYY-MM-DD");
  	this.getTotalInteractions(weekAgo, today, "day");
    this.getAverageOperationalTime(weekAgo, today);
    this.getFAQ(weekAgo, today);
    this.getValuations(weekAgo, today);
    this.getAssertiveness(weekAgo, today);
    this.getDetailInteractions(weekAgo, today);
    this.getDetailSesiones(weekAgo, today);
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
          category.color = "#FF795A";
        } else if(category.categoria === "cuenta corriente") {
          category.color = "#4DA1FF";
        } else if(category.categoria === "CAE") {
          category.color = "#7C4DC4";
        } else if(category.categoria === "") {
          toDelete.push(i);
        } else {
          category.abreviatura = "-";
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
    this.setState({faqLoading: true});    
    this.getCategories((error, categories) => {      
      if(error) {
          console.log("getCategories error");
          console.log(error);
          this.setState({faqLoading: false});
          if(cb) cb(error);
          return;
      }      
      getFAQ(start_date, end_date, (error, data) => {
        if(error) {
          console.log("getFAQ error");
          console.log(error);
          this.setState({faqLoading: false});          
          if(cb) cb(error);
          return;
        }
        data.respuesta.forEach((resp) => {
          resp.categoria = _.find(categories, function(cat) {return resp.categoria === cat.categoria});
        });
        var faqGraph = {};
        faqGraph.csv = data.csv;
        faqGraph.data = data.respuesta;        
        this.setState({faqGraph, categories, faqLoading: false}, () => {if(cb) cb();});
      });
    });
  }
  getTotalInteractions(start_date, end_date, period, cb) {
    this.setState({interactionsLoading: true});    
    getTotalInteractions(start_date, end_date, (error, data) => {
      if(error) {
        console.log("getTotalInteractions error");
        console.log(error);
        this.setState({interactionsLoading: false});    
        if(cb) cb(error);
        return;
      }
      if(start_date === end_date) {
        period = "hour";
      }
      var interactionsGraph = {};
      interactionsGraph.csv = data.csv;
      interactionsGraph.data = this.groupDaysBy(data.respuesta, period);
      interactionsGraph.data.sesiones = this.groupDaysBy(data.respuesta, period, "sesiones").values;

      this.setState({interactionsGraph, interactionsLoading: false}, () => {if(cb) cb()});
    });
  }
  getAverageOperationalTime(start_date, end_date, cb) {
    this.setState({averageOperationalTimeLoading: true});    
    getAverageOperationalTime(start_date, end_date, (error, data) => {
      if(error) {
        console.log("getTotalInteractions error");
        console.log(error);
        this.setState({averageOperationalTimeLoading: false});    
        if(cb) cb(error);
        return;
      }
      var period = "day";
      if(start_date === end_date) {
        period = "hour";
      }
      var averageOperationalTimeGraph = {};
      averageOperationalTimeGraph.csv = data.csv;
      averageOperationalTimeGraph.data = this.groupDaysBy(data.respuesta, period, "tmo_segundos");
      this.setState({averageOperationalTimeGraph, averageOperationalTimeLoading: false}, () => {if(cb) cb()});
    }); 
  }
  getValuations(start_date, end_date, cb) {
    this.setState({valuationsLoading: true});    
    getValuations(start_date, end_date, (error, data) => {
      if(error) {
        console.log("getValuations error");
        console.log(error);
        this.setState({valuationsLoading: false});            
        if(cb) cb(error);
        return;
      }
      var period = "day";
      if(start_date === end_date) {
        period = "hour";
      }
      var valuationsGraph = {};
      valuationsGraph.csv = data.csv;
      valuationsGraph.data = this.proccessValuations(data.respuesta, period, "nps");
      var sessionsGraph = {};
      sessionsGraph.csv = data.csv;
      sessionsGraph.data = this.proccessValuations(data.respuesta, period, "nps");
      this.setState({valuationsGraph, sessionsGraph, valuationsLoading: false}, () => {if(cb) cb()});
    }); 
  }
  proccessValuations(data, by) {
    var result2 = {labels: [], nps: [], promotores: [], neutros: [], detractores: []};
     
    data.forEach((day, i) => {
        var dayDesc = null;
        if(by ==="hour") {
          dayDesc = day.hora + ":00";
        } else {
          dayDesc = day.dia + " " + getMonthName(day.mes);          
        }
        result2.labels.push(dayDesc);
        result2.nps.push(day.nps);
        result2.promotores.push(day['4'] + day['5']);        
        result2.neutros.push(day['3']);
        result2.detractores.push(day['1'] + day['2']);
    });
    
      
    return result2;
  }
  getAssertiveness(start_date, end_date, cb) {
    this.setState({assertivenessLoading: true});    
    getAssertiveness(start_date, end_date, (error, data) => {
      if(error) {
        console.log("getAssertiveness error");
        console.log(error);
        this.setState({assertivenessLoading: false});    
        if(cb) cb(error);
        return;
      }
      var period = "day";
      if(start_date === end_date) {
        period = "hour";
      }
      var assertivenessGraph = {};
      assertivenessGraph.csv = data.csv;
      assertivenessGraph.data = this.groupDaysBy(data.respuesta, period, "si");
      var no = this.groupDaysBy(data.respuesta, period, "no");
      assertivenessGraph.data.values2 = no.values;
      this.setState({assertivenessGraph, assertivenessLoading: false}, () => {if(cb) cb()});
    }); 
  }
  getDetailInteractions(start_date, end_date, period, cb) {
    this.setState({detailsLoading: true});    
    getDetailInteractions(start_date, end_date, (error, data) => {
      if(error) {
        console.log("getDetailInteractions error");
        console.log(error); 
        this.setState({detailsLoading: false});    
        if(cb) cb(error);
        return;
      }
      var detailInteractionsGraph = {};
      detailInteractionsGraph.csv = data.csv;
      this.setState({detailInteractionsGraph, detailsLoading: false}, () => {if(cb) cb()});
    });
  }
  getDetailSesiones(start_date, end_date,period, cb) {
    this.setState({detailsLoading: true});    
    getDetailSesiones(start_date, end_date, (error, data) => {
      if(error) {
        console.log("getDetailSesiones error");
        console.log(error);
        this.setState({detailsLoading: true});
        if(cb) cb(error);
        return;
      }
      var detailSesionesGraph = {};
      detailSesionesGraph.csv = data.csv;
      this.setState({detailSesionesGraph, detailsLoading: false}, () => {if(cb) cb()});
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
        var weekDesc = "Sem. " + date.week() + " - " + day.ano;          
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
    if(by === "hour") {
      data.forEach((hour, i) => {
        var hourDesc = hour.hora + ":00";          
          result2.labels.push(hourDesc);
          result2.values.push(hour[valueField]);
      });
    }
    return result2;
  }
  render() {
    return (      
			<Home 
        interactionsGraph={this.state.interactionsGraph}
        faqGraph={this.state.faqGraph}
        assertivenessGraph={this.state.assertivenessGraph}
        averageOperationalTimeGraph={this.state.averageOperationalTimeGraph}
        valuationsGraph={this.state.valuationsGraph}
        sessionsGraph={this.state.sessionsGraph}
        categories={this.state.categories}

        getTotalInteractions={this.getTotalInteractions.bind(this)}
        getAverageOperationalTime={this.getAverageOperationalTime.bind(this)}
        getFAQ={this.getFAQ.bind(this)}
        getValuations={this.getValuations.bind(this)}
        getAssertiveness={this.getAssertiveness.bind(this)}

        interactionsLoading={this.state.interactionsLoading}
        faqLoading={this.state.faqLoading}
        averageOperationalTimeLoading={this.state.averageOperationalTimeLoading}
        valuationsLoading={this.state.valuationsLoading}
        assertivenessLoading={this.state.assertivenessLoading}
        detailsLoading={this.state.detailsLoading}

        getDetailInteractions={this.getDetailInteractions.bind(this)}
        getDetailSesiones={this.getDetailSesiones.bind(this)}        
        detailInteractionsGraph={this.state.detailInteractionsGraph}
        detailSesionesGraph={this.state.detailSesionesGraph}
        
      />		    
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