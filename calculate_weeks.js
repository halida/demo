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
    var total_weeks = calculate_weeks(d, expiration);
    $('#weeks').html(total_weeks);

    date_grid.append("<br/><div class='month'>"+ monthNames[d.getMonth()] +"</div>");
    while (expiration > d) {
      var weeks = calculate_weeks(d, expiration);
      // month start
      if (d.getDate() == 1) {
        date_grid.append("<br/><div class='month'>"+ monthNames[d.getMonth()] +"</div>");
        for(var i=0; i<d.getDay(); i++){
          date_grid.append("<span class='day'>&ensp;</span>");
        }
      }
      if (d.getDay() == 0) {
        date_grid.append("<br/>");
      }
      date_grid.append("<span class='day' title='"+d.toLocaleDateString()+"'>"+(total_weeks - weeks + 1)+"</span>");
      d = d.addDays(1);
    }
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
