
var socket = io.connect();

var nickname = '';

function addMessage( msg, nick ) {
	$( "#chatEntries" ).append( '<div class="message"><p><span id="nick">'+nick+'</span> : '+msg+'</p></div>' );
};

function sendMessage() {
	if ( $( '#messageInput' ).val() != "" ) 
	{
		socket.emit( 'message', $( '#messageInput' ).val());
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
    socket.emit( "joinRoom", location.pathname.slice( 1 ) );
});

// add message to screen upon receiving it from server
socket.on( 'message', function( data ) {
	addMessage( data[ 'message' ], data[ 'nick' ] );
});


$( document ).ready( function() {
    if (nickname) {
        $( "#nickInput" ).val(nickname); 
        console.log($( "#nickInput" ).val());
    };    

    // initialize fn - hide chat box until nick is set, add events to buttons
    $( function() {
	    $( "#chatControls" ).hide();
        $( 'input' ).focus(); // focus on nick input upon page load
	    $( "#nickSet" ).click( function() { 
            setNick(); 
            $( 'input' ).focus(); // focus on message input after submitting nick
        } );
	    $( "#submit" ).click( function() { 
            sendMessage(); 
            $( 'input' ).focus(); // focus on message input after submitting message
        } );
    });

    // pressing enter sends message
    $( 'input' ).keydown( function( event ) {
        if ( event.keyCode == 13 ) {
            $( this ).next( 'button' ).click();
        };
    });

});

