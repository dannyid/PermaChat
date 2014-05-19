
var socket = io.connect();

var nickname = '';

function addMessage( message, nick ) {
	$( "#chatEntries" ).append( '<div class="message"><p><span id="nick">'+nick+'</span> : '+message+'</p></div>' );
};

function sendMessage() {
	if ( $( '#messageInput' ).val() != "" ) {
		socket.emit( 'message', {"nick": nickname, "message": $( '#messageInput' ).val()} );
		addMessage( $( '#messageInput' ).val(), nickname + " (Me)");
		$( '#messageInput' ).val('');
	}
};

function setNick() {
	if ( $( "#nickInput" ).val() != "" ) {
		socket.emit( 'setNick', $( "#nickInput" ).val() );
		$( '#chatControls' ).show();
		$( '#nickInput' ).hide();
		$( '#nickSet' ).hide();
    nickname = $( "#nickInput" ).val();
    console.log("Name for this session set to: " + nickname)
	}
};

// join room specified by URL
socket.on( "connect", function( data ) {
    socket.emit( "join", location.pathname.slice( 6 ) );
});

// add message to screen upon receiving it from server
socket.on( 'message', function( data ) {
	addMessage( data[ 'message' ], data[ 'nick' ] );
});

$( document ).ready( function() {
    // initialize fn - hide chat box until nick is set, add events to buttons
    $( function() {
	    $( "#chatControls" ).hide();
        $( '#nickInput' ).focus(); // focus on nick input upon page load
	    $( "#nickSet" ).click( function() { 
            setNick(); 
            $( '#messageInput' ).focus(); // focus on message input after submitting nick
        } );
	    $( "#submit" ).click( function() { 
            sendMessage(); 
            $( '#messageInput' ).focus(); // focus on message input after submitting message
        } );
    });

    // pressing enter sends message
    $( '#nickInput, #messageInput' ).keydown( function( event ) {
        if ( event.keyCode == 13 ) {
            $( this ).next( 'button' ).click();
        };
    });

});

