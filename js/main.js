var menu = {
	selectedItem: null,
	items: [],
	init: function()
	{
		$.ajax({
		    url: "menu.php",
		    dataType:"json",
		    success: function(jsonData){
		    	actualValues.values = jsonData.values;
		    	menu.items = jsonData.menu;
				var $menu = $("<div></div>");
				var $pages = $("<div><div id=\"chart_container\"><div id=\"step_chart\"></div><div id=\"line_chart\"></div><div id=\"minmax_chart\"></div></div><div id=\"energy_container\"><div id=\"bar_chart\"></div></div></div>");
				$pages.find("#minmax_chart").hide();
				
				for (var i in menu.items)
				{
					var item = menu.items[i];
					var $item = $('<div class="item"><div class="icon"></div><div>'+item.name+'</div></div>');
					item["item"] = $item;
					item["index"] = i;
					switch(item.type)
					{
						case 'schema':
							$item.find("div.icon").addClass("home");
							var $container = $('<div class="schema"></div>').load("images/"+item.schema);
							$pages.append($container);
							item["container"] = $container;
							break;
						case 'weather':
							$item.find("div.icon").addClass("weather");
							var $container = $('<div class="weatherinfo"><div class="weathericon"><img></img><table class="weatherdetail"><tr><td collspan=2 class="description"><td><tr><tr><td class="leftalign"rowspan=2><span class="temp actuell"></span></td><td class="rightalign">Max: <span class="temp max"></span></td></tr><tr><td class="rightalign">Min: <span class="temp min"></span></td></tr></table></div><h2></h2><div class="weatherdetail"><span class="weathercity"></span> - <span class="weathertime"></span></div><h3>Details</h3><table><tr><td class="weatherprop">Temperatur:</td><td class="weathervalue"></td></tr><tr><td class="weatherprop">Luftfeuchtigkeit:</td><td class="weathervalue"></td></tr><tr><td class="weatherprop">Bewölkung:</td><td class="weathervalue"></td></tr><tr><td class="weatherprop">Wind:</td><td class="weathervalue"></td></tr><tr><td class="weatherprop">Niederschlag:</td><td class="weathervalue"></td></tr><tr><td class="weatherprop">Luftdruck:</td><td class="weathervalue"></td></tr><tr><td class="weatherprop">Sonnenaufgang:</td><td class="weathervalue"></td></tr><tr><td class="weatherprop">Sonnenuntergang:</td><td class="weathervalue"></td></tr></table></div>');
							item["load"] = weather.fetch;
							$pages.append($container);
							item["container"] = $container;
							break;
						case 'energy':
							$item.find("div.icon").addClass("chart");
							item["container"] = $pages.find("#energy_container");
							item["load"] = barChart.fetch;
							item["table"] = new EnergyTable(item);
					  		break;
						case 'line':
							$item.find("div.icon").addClass("chart");
							item["container"] = $pages.find("#chart_container");
							item["load"] = lineChart.fetch;
							item["page"] = "analogChart.php"
							item["table"] = new Table(item);
					  		break;
						case 'power':
							$item.find("div.icon").addClass("chart");
							item["container"] = $pages.find("#chart_container");
							item["load"] = lineChart.fetch;
							item["page"] = "powerChart.php";
							item["table"] = new Table(item);
					  		break;
					}
					$item.data(item);
					$menu.append($item);
				}

				$menu.find("div.item").hover(function() {
					$(this).addClass("hover");
				},
				function() {
					$(this).removeClass("hover");
				});
				
				$menu.find("div.item").click(function() {
					location.hash = $(this).data("index");
				});
				
				$(document).ready(function() {
					$("#menu").append($menu.children());
					$("#pages").append($pages.children());
					menu.display();
					lineChart.init();
					barChart.init();
					minmaxChart.init();
					menu.handle();
				});
		    }
		});
	},
	display: function()
	{
		$("#browser").hide();
		if(!$("div.item").is(":visible")) {
			$("div.item").fadeIn('slow');
		}	
	},
	handle: function()
	{
		var id = location.hash.substr(1);
		if(id == "home" || menu.items[id]==null){
			$("#logo").animate({'top':'50%','left':'50%'});
			$("#menu").fadeIn();
			$("body").animate({'background-color':'#EEE'});
			$("#content").animate({'top':'100%'},function(){
				$("#content").hide();
			});
			menu.selectedItem = null;
		}
		else if(menu.items[id] != menu.selectedItem){
			menu.selectedItem = menu.items[id];
			if($("#menu").is(':visible')){
				var newItem = menu.items[id].item;
				$("div.active").removeClass("active");
				newItem.addClass("active");
				var indicator = $("#indicator");
				var top = newItem.position().top + 14;
				var left = newItem.position().left -1;
				if(!indicator.is(':visible'))
				{
					indicator.css({'top': top , 'left': left});
					indicator.fadeIn();
				}
				if(indicator.position().top != top)
				{
					indicator.animate({'top':top});
				}
				indicator.animate({'left':left}, function() {
					$("#logo").animate({'top':230,'left':230});
					$("#menu").fadeOut();
					$("body").animate({'background-color':'#FFF'});
					$("#content").show().animate({'top':90}, function() {
						$("#content").trigger('complete');
					});
					
					menu.showContent();
				});
			}
			else
			{
				menu.showContent();
			}
		}
	},
	showContent: function()
	{
		$("#pages > table.chartinfo").detach();
		$("#pages").children().hide();
		menu.selectedItem["container"].show();
		
		switch(menu.selectedItem["type"]) {
			case "schema":
				toolbar.hideDateNavigation();
				actualValues.fetchData();
				break;
			case "weather":
				toolbar.hideDateNavigation();
				menu.selectedItem.load(menu.selectedItem["schema"]);
				break;
			case "energy":
				toolbar.showDateNavigation();
				toolbar.showGrouping();
				menu.selectedItem.load();
				menu.selectedItem.table.getTable().appendTo("#pages");
				break;
			default:
				toolbar.showDateNavigation();
				toolbar.showPeriod();
				menu.selectedItem.load();
				menu.selectedItem.table.getTable().appendTo("#pages");
				break;
		}
	}
}


var weather = 
{
	fetch: function(city)
	{
		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/weather",
			jsonp: "callback",
			dataType: "jsonp",
			data: {
				q: city,
				units: "metric",
				lang: "de"
			},
			success: function(data)
			{
				var dateFormatter = new google.visualization.DateFormat({pattern: "EEEE, dd.MM.yyyy, HH:mm"});
				var timeFormatter = new google.visualization.DateFormat({pattern: "HH:mm"});
				menu.selectedItem["container"].find("h2").text(data.name);
				menu.selectedItem["container"].find("span.weathercity").text(data.sys.country);
				menu.selectedItem["container"].find("span.weathertime").text(dateFormatter.formatValue(new Date(data.dt*1000)));
				menu.selectedItem["container"].find("div.weathericon td.description").text(data.weather[0].description);
				menu.selectedItem["container"].find("div.weathericon img").attr("src", "images/weather/"+data.weather[0].icon+".png");
				menu.selectedItem["container"].find("div.weathericon span.temp.actuell").text(data.main.temp + " °C");
				menu.selectedItem["container"].find("div.weathericon span.temp.max").text(data.main.temp_max + " °C");
				menu.selectedItem["container"].find("div.weathericon span.temp.min").text(data.main.temp_min + " °C");
				menu.selectedItem["container"].find("table td.weathervalue:eq(0)").text(data.main.temp + " °C");
				menu.selectedItem["container"].find("table td.weathervalue:eq(1)").text(data.main.humidity + "%");
				menu.selectedItem["container"].find("table td.weathervalue:eq(2)").text(data.clouds.all + "%");
				menu.selectedItem["container"].find("table td.weathervalue:eq(3)").text(data.wind.speed + " km/h");
				menu.selectedItem["container"].find("table td.weathervalue:eq(4)").text(data.rain["1h"] + " mm");
				menu.selectedItem["container"].find("table td.weathervalue:eq(5)").text(data.main.pressure + " mbar");
				menu.selectedItem["container"].find("table td.weathervalue:eq(6)").text(timeFormatter.formatValue(new Date(data.sys.sunrise*1000)));
				menu.selectedItem["container"].find("table td.weathervalue:eq(7)").text(timeFormatter.formatValue(new Date(data.sys.sunset*1000)));
			}
		});	
    }
}


var actualValues = 
{
	init: function()
	{
		this.fetchData();
		setTimeout(this.timer, 30000);
	},
	fetchData: function()
	{
		$.ajax({
			url: "latest.php",
			dataType:"json",
			success: this.display
		});
	},
	timer: function()
	{
		if(menu.selectedItem && menu.selectedItem["type"] == "schema")
		{
			actualValues.fetchData();
		}
		setTimeout(actualValues.timer, 30000);
	},
	display: function(data)
	{
		for(var i in actualValues.values) {
			try {
     			var value = actualValues.values[i];
				var type  = "value";
     			var text = value.format.replace(/((DIGITAL|MWH|KWH|MISCHER_AUF|MISCHER_ZU|VENTIL|DREHZAHL|GRADCOLOR|ANIMATION)\()?#\.?(#*)\)?/g, function(number,tmp,modifier,fractions) {
     				switch(modifier) {
     					case "MISCHER_AUF":
     						return converter.mixerOn(data[value.frame][value.type]);
     					case "MISCHER_ZU":
     						return converter.mixerOff(data[value.frame][value.type]);
     					case "VENTIL":
     						return converter.valve(data[value.frame][value.type]);
     					case "DIGITAL":
     						return converter.digital(data[value.frame][value.type]);
     					case "MWH":
     						return converter.mwh(data[value.frame][value.type]);
     					case "KWH":
     						return converter.kwh(data[value.frame][value.type]).toFixed(fractions.length);
     					case "DREHZAHL":
     						return converter.speed(data[value.frame][value.type]);
						case "GRADCOLOR":
							type = "gradcolor";
							return converter.color(data[value.frame][value.type]);
     					case "ANIMATION":
     						for(var i in $(value.path))
     						{
     							if(data[value.frame][value.type] == 1)
     							{
     								$(value.path)[i].beginElement();
     							}
     							else
     							{
     								$(value.path)[i].endElement();	
     							}
     						}
     						return null;
     					default:
     						try {
     							return data[value.frame][value.type].toFixed(fractions.length);
     						}
     						catch (e) {
     							return data[value.frame][value.type];
     						}
     				}
     
     			});
			}
			catch(e) {
				var text = "ERROR";
			}
     			
     		if(text != null)
     		{
				switch(type) {
					case "gradcolor":
						$(value.path).attr("style","stop-color:"+text);
						break;
					default:
						$(value.path).text(text);
				}
     		}
			
		}
		$("#time").text(data["time"]);
	}
}

var converter = {
	digital: function(value)
	{
		if(value == 1) {
			return 'EIN';
		}
		else {
			return 'AUS';
		}
	},
	mwh: function(value)
	{
		return Math.floor(value/1000);
	},
	kwh: function(value)
	{
		return value%1000;
	},
	mixerOn: function(value)
	{
		if(value == 1) {
			return 'AUF';
		}
		return '';
	},
	mixerOff: function(value)
	{
		if(value == 1) {
			return 'ZU';
		}
		return '';
	},
	speed: function(value)
	{
		return (value/30*100).toFixed()+"%";
	},
	valve: function(value)
	{
		if(value == 1) {
			return 'OFFEN';
		}
		else {
			return 'ZU';
		}
	},
	color: function(value)
	{
		var highColor = menu.selectedItem.options["high_color"];
		var lowColor = menu.selectedItem.options["low_color"];
		var highTemp = parseFloat(menu.selectedItem.options["high_temp"]);
		var lowTemp = parseFloat(menu.selectedItem.options["low_temp"]);
		if(value > highTemp) {
			return highColor;
		}
		else if(value < lowTemp) {
			return lowColor;
		}
		else {
			var lr = parseInt("0x"+lowColor.substring(1,3));
			var lg = parseInt("0x"+lowColor.substring(3,5));
			var lb = parseInt("0x"+lowColor.substring(5,7));
			var hr = parseInt("0x"+highColor.substring(1,3));
			var hg = parseInt("0x"+highColor.substring(3,5));
			var hb = parseInt("0x"+highColor.substring(5,7));
			var cr = parseInt(lr + (hr-lr)*(value-lowTemp)/(highTemp-lowTemp)).toString(16);
			var cg = parseInt(lg + (hg-lg)*(value-lowTemp)/(highTemp-lowTemp)).toString(16);
			var cb = parseInt(lb + (hb-lb)*(value-lowTemp)/(highTemp-lowTemp)).toString(16);
			cr = cr.length == 1 ? "0"+cr: cr;
			cg = cg.length == 1 ? "0"+cg: cg;
			cb = cb.length == 1 ? "0"+cb: cb;
			return "#"+cr+cg+cb;
		}
	}
}

google.load('visualization', '1', {'packages':['corechart']});
menu.init();

$(document).ready(function() {
	actualValues.init();
	toolbar.init();
	
	$(window).on("hashchange", menu.handle);
});