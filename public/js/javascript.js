function aantalInschrijvingenTonen(){
    $.ajax({
        type: "GET",
        url: "/inschrijvingen/aantal",
        succes: function(aantal){
            console.log(aantal);
        }});
  //#aantalInschrijvingenBody
}
