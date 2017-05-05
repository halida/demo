var init = function(){
  var monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                   ];
  window.run = function() {
    var inception = new Date( $('#tx_inception').val());
    var expiration = new Date( $('#tx_expiration').val());
    var billing = new Date( $('#tx_billing').val());
    console.log(inception);

    var date_grid = $("#data_grid");
    date_grid.html("");

    var d = billing;
    var total_weeks = calculate_period_number(inception, expiration.addDays(-1));
    var current = calculate_period_number(inception, billing);
    $('#total_weeks').html(total_weeks);
    $('#remain_weeks').html(total_weeks - current + 1);

    date_grid.append("<br/><div class='month'>"+ monthNames[d.getMonth()] +"</div>");
    while (expiration > d) {
      // month start
      if (d.getDate() == 1) {
        date_grid.append("<br/><div class='month'>"+ monthNames[d.getMonth()] +"</div>");
        for(var i=0; i<d.getDay(); i++){
          date_grid.append("<span class='day'>&ensp;&ensp;&ensp;</span>");
        }
      }
      if (d.getDay() == 0) {
        date_grid.append("<br/>");
      }
      var weeks = calculate_period_number(inception, d);
      date_grid.append("<span class='day' title='"+d.toLocaleDateString()+"'>"+weeks+"/"+(total_weeks - weeks + 1)+"</span>");
      d = d.addDays(1);
    }
  }

  var calculate_period_number = function(coverage_inception_date, reference) {
    var result = 0
    var anniversary = 0
    var anniversary_day = 0

    var before = step(coverage_inception_date, anniversary, -1);
    if (before <= reference) {
      result = 0;
      var dwhen = step(coverage_inception_date, anniversary, 1);
      if (dwhen <= reference) {
        console.log(reference);
        days = Math.floor((reference - dwhen) / 86400000);
        weeks = Math.floor(days / 7);
        weeks ++;
        result += weeks;
      }
    }

    return result;
  }

  var step = function(dwhen, toWhat, direction){
    var result = dwhen;
    var offset = function(d){ return d.addDays(nagate_if_needed(direction, 1)); };
    var success = function(d){ return d.getDay() == toWhat; };

    while(!success(result)) {
      result = offset(result);
    }
    return result;
  }

  var nagate_if_needed = function(direction, what) {
    var result = what;
    if (-1 == direction) { result *= -1 };
    return result;
  }

  var calculate_weeks = function(start, end){
    if (end <= start) { return 0; }
    var result = 1;
    var d = start;
    d = d.addDays(1);
    while (end > d)
    {
      if (d.getDay() == 0) { result++; }
      d = d.addDays(1);
    }
    return result;
  }
  
  Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  }
  run();
}

init();
