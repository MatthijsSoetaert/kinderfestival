function administratorVerwijderen(administrator){
    var id = administrator.split('id: ');
    console.log(id[1]);
    //voorEnAchternaam[0] = voorEnAchternaam[0].replace(/\s/g, '');
    hreflinkVerwijderen = "/administrator/verwijderen/".concat(id[1]);
    $(".btn.btn-danger.verwijderKnop").attr("href", hreflinkVerwijderen);
}

function nieuwsbriefVerwijderen(email){
    console.log(email);
    hreflinkVerwijderen = "/nieuwsbrief/verwijderen/".concat(email);
    $(".btn.btn-danger.verwijderKnop").attr("href", hreflinkVerwijderen);

}
function aantalInschrijvingenTonen(){
        console.log('test');
        $.ajax({
            type: 'GET',
            url:'/inschrijving/aantallen',
            complete: function(data){
                document.getElementById('aantalInschrijvingenBody').innerHTML = ('Er zijn ' + data.responseJSON + ' inschrijvingen');
            }
        });
    };
