const clientId = 'qvtuq71csrlv5ipxo1ljzgbzqn1okh' ;
const limitItem = 21;
let offset = 0 ;
let apiUrl;
let isLoad = false ;
let isLoadLastItem = false ;
let liveCounter = 0 ;

$(document).ready(function(){
	apiUrl =  "https://api.twitch.tv/kraken/streams/?client_id=" + 
						clientId +
						"&game=League%20of%20Legends&limit=" +
						limitItem + "&offset=" + offset ;
	queryLive(procesLiveInfo) ;
});


function queryLive(cb) {
	$.ajax({
		dataType: "json",
		url: apiUrl,
		success: function(response){
			console.log(response);
			isLoad = true ;
			cb(null, response);
		},
		error: function(err) {
			cb(err);
		}
	});
}

function procesLiveInfo(err,data) {
	if (err) {
		console.log(err);
	}
	else {
		const streams =  data.streams;
		const row = $('.row');
		liveCounter = streams.length;
		for (let i=0 ; i<streams.length ; i++ ) {
			row.append(getColumn(streams[i]));
		}
	}
}

function getColumn(data) {
	return `
	<div class="col">
		<div class="preview">
			<img src="${data.preview.large}" onload="this.style.opacity=1" alt="">
		</div>
		<div class="descript">
			<div class="avatar">
				<img src="${data.channel.logo}"  onload="this.style.opacity=1" alt="">
			</div>
			<div class="introduce">
				<div class="ch-name">${data.channel.status}</div>
				<div class="ch-master">${data.channel.name}</div>
			</div>
		</div>
	</div>
	`;
}

$(window).scroll(function(){
	if ($(window).scrollTop()+$(window).height()+200 >= $(document).height()){
		//console.log("scroll--->bottom");

		if (liveCounter < limitItem) isLoadLastItem = true ;

		if (isLoad &&  !isLoadLastItem){
			isLoad = false ;

			offset+= limitItem;
			apiUrl =  "https://api.twitch.tv/kraken/streams/?client_id=" + 
								clientId +
								"&game=League%20of%20Legends&limit=" +
								limitItem + "&offset=" + offset ;
			queryLive(procesLiveInfo) ;
			console.log("offset = " + offset);
		}
	}
});