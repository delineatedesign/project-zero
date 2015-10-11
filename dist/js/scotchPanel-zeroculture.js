$('#zero-scotch-panel').scotchPanel({
  containerSelector: '#wrapper-scotchpanel', // jQuery Selector
  direction: 'left', // Make it toggle in from the left
  duration: 300, // Animation speed in ms
  transition: 'ease', // CSS3 transition type: linear, ease, ease-in, ease-out, etc..
  clickSelector: '.toggle-panel', // Selector class that enables toggling
  distanceX: '280px', // Width of selector element when open
  enableEscapeKey: true // Click Esc to close
});
/* Add scotchPanel to sub menu too */
$('#nested-scotch-panel').scotchPanel({
  containerSelector: '#scotch-panel',
  clickSelector: '.toggle-nested-scotch-panel',
  touchSelector: '.toggle-nested-scotch-panel'
});

$('.toggle-panel').click(function() {
  $('.header').toggleClass('scotch-is-showing');
})