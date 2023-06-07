$(document).ready(function(){
    $("#regE").on("submit", function(event){
        event.preventDefault();
        console.log("HEllo");

        let naziv = $("#naziv").val();
        let opis = $("#opis").val();
        let datum = $("#datum").val();
        let slika = $("#slika");

        const reader = new FileReader();
        if(slika[0].files[0] != null) {
            reader.addEventListener("load", () => {
                $.ajax({
                    method: "POST",
                    action: "/upload",
                    url: "/profile",
                    contentType: "application/json",
                    data: JSON.stringify({
                        naziv: naziv,
                        opis: opis,
                        datum: datum,
                        slika: reader.result
                    }),
                    success: function (res) {
                        if (res.mogu)
                            window.location.href = "/login";
                        else
                            $("#postoji_institucija").show();
                    }
                })
            })
        }else{
            $.ajax({
                method: "POST",
                action: "/upload",
                url: "/profile",
                contentType: "application/json",
                data: JSON.stringify({
                    naziv: naziv,
                    opis: opis,
                    datum: datum,
                    slika: reader.result
                }),
                success: function (res) {
                    window.location.href = "/login";
                }
            })
        }
        if(slika[0].files[0] != null)
            reader.readAsDataURL(slika[0].files[0]);
    })

});

