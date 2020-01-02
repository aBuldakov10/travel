$('.location_field').on('change', function () {
	var locationReg = /[A-Za-z]/;
	if (!$('.location_field').val().match(locationReg)) {
		$('.location_field').val('');
		$('#locationMessage').html('use only letters')
	}
	else {
		$('#locationMessage').html('');
	}
})

$('.date_field').on('change', function () {
	var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;
	var newSplit = [];
	if (!$('.date_field').val().match(dateReg)) {
		$('.date_field').val('');
		alert ('incorrect date format. only dd.mm.yyy or dd-mm-yyy or dd/mm/yyy');
	}
	if ($('.date_field').val()[2] == '.') {
		newSplit = $('.date_field').val().split('.')
	}
	if ($('.date_field').val()[2] == '/') {
		newSplit = $('.date_field').val().split('/')
	}
	if ($('.date_field').val()[2] == '-') {
		newSplit = $('.date_field').val().split('-')
	}$('.date_field').val().split('/[./-]/')
	console.log(newSplit)
})

$('.person_field').on('change', function () {
	var personReg = /[0-9]/;
	if (!$('.person_field').val().match(personReg)) {
		$('.person_field').val('');
		alert('incorrect person format. only number');
		$('.search_item_errorMessage').html('dfdf')
	}
	console.log($(this).next().html())
})