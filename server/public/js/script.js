
var socket = io.connect();

function addMessage( msg, nick ) {
	$( "#chatEntries" ).append( '<div class="message"><p>' + nick + ' : ' + msg + '</p></div>' );
};

function sentMessage() {
	if ( $( '#messageInput' ).val() != "" ) 
	{
		socket.emit( 'message', $( '#messageInput' ).val());
		addMessage( $( '#messageInput' ).val(), "Me", new Date().toISOString(), true );
		$( '#messageInput' ).val('');
	}
};

function setnick() {
	if ( $( "#nickInput" ).val() != "" ) {
		socket.emit( 'setnick', $( "#nickInput" ).val() );
		$( '#chatControls' ).show();
		$( '#nickInput' ).hide();
		$( '#nickSet' ).hide();
        localStorage["name"] = $( "#nickInput" ).val();
        console.log("Name in localStroage: " + localStorage["name"])
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
    if (localStorage.name) {
        $( "#nickInput" ).val(localStorage.name); 
        console.log($( "#nickInput" ).val());
        $( "#nickSet" ).click();
        console.log($( "#nickInput" ).val());
    };    

    // initialize fn - hide chat box until nick is set, add events to buttons
    $( function() {
	    $( "#chatControls" ).hide();
        $( 'input' ).focus(); // focus on nick input upon page load
	    $( "#nickSet" ).click( function() { 
            setnick(); 
            $( 'input' ).focus(); // focus on messge input after submitting nick
        } );
	    $( "#submit" ).click( function() { 
            sentMessage(); 
            $( 'input' ).focus(); // focus on messge input after submitting message
        } );
    });

    // pressing enter sends message
    $( 'input' ).keydown( function( event ) {
        if ( event.keyCode == 13 ) {
            $( this ).next( 'button' ).click();
        };
    });

});

//localStorage test

