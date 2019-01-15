const clientId = 'qvtuq71csrlv5ipxo1ljzgbzqn1okh' ;
const limitItem = 20;
const apiUrl =  "https://api.twitch.tv/kraken/streams/?client_id=" + 
									clientId +
									"&game=League%20of%20Legends&limit=" +
									limitItem ;

$(document).ready(function(){
	queryLive(procesLiveInfo) ;
});


function queryLive(cb) {
	$.ajax({
		dataType: "json",
		url: apiUrl,
		success: function(response){
			console.log(response);
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
		for (let i=0 ; i<streams.length ; i++ ) {
			row.append(getColumn(streams[i]));
		}
	}
}

function getColumn(data) {
	return `
	<div class="col">
		<img class="preview" src="${data.preview.large}" alt="">
		<div class="descript">
			<img class="avatar" src="${data.channel.logo}" alt="">
			<div class="introduce">
				<div class="ch-name">${data.channel.status}</div>
				<div class="ch-master">${data.channel.name}</div>
			</div>
		</div>
	</div>
	`;
}