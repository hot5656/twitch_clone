let chName;
let chMaster;
let avatar;
let chPreview;
let row = $(".row");
let clientId = 'qvtuq71csrlv5ipxo1ljzgbzqn1okh' ;
let limitItem = 20;
let urlAddress =  "https://api.twitch.tv/kraken/streams/?client_id=" + 
									clientId +
									"&game=League%20of%20Legends&limit=" +
									limitItem ;

$(document).ready(function(){
	let col = $(".col");

	for(let i=0 ; i<20 ; i++) {
		let colNew = col[0].cloneNode(true);

		if (i == 19) {
			colNew.style.display = "block" ;
			colNew.style.visibility = "hidden" ;			
		}
		row.append(colNew);
	}

	chName =	$(".col > .descript > .introduce > .ch-name");
	chMaster =	$(".col > .descript > .introduce > .ch-master");
	avatar =	$(".col > .descript > .avatar");
	chPreview =	$(".col > .preview");
	queryLive();
});


function queryLive() {
	$.ajax({
		dataType: "json",
		url: urlAddress,
		success: function(data){
			let col = $(".col");
			let isNoshow = false ;
			
			for(let i=0 ; i<20 ; i++) {
				if (data.streams[i] !== undefined) {
				chName[i].innerText = data.streams[i].channel._id;
				chMaster[i].innerText = data.streams[i].channel.name;
				chPreview[i].src = data.streams[i].preview.large;
				avatar[i].src = data.streams[i].channel.logo;
					col[i].style.display = "block" ;
					col[i].style.visibility = "visible" ;
					console.log(i);
				}
				else {
					if (i%3 == 0) isNoshow = true;
					if (isNoshow) {
						col[i].style.display = "none" ;
						col[i].style.visibility = "visible" ;
					}
					else {
						col[i].style.display = "block" ;
						col[i].style.visibility = "hidden" ;
					}
				}

			}

			// setTimeout(queryLive, 16);
		}
	});

}