(function(window, document) {

	var myBitcoinAddress = '1LFk8i74MTBEKfViAfvKsbX4mG2iFfRiBF',
		areas = document.getElementsByTagName("textarea"),
		elements = document.forms[0].elements,
		i,
		showCase = $('#showcase'),
		URI = $('#URI')

	function $(query) {
		query = document.querySelectorAll(query)

		return (query[1]) ? query : query[0]
	}

	$("#logo").addEventListener('click', function() {
		window.prompt('Please donate bitcoins to:', myBitcoinAddress);
	}, false);

	for(i = 0; i < elements.length; i++) {
		elements[i].addEventListener('input', update, false);
		elements[i].addEventListener('change', update, false);
	}

	function update() {
		var buttonSize = $("#buttonSize").value,
			donateAddress = $("#donateAddress").value || myBitcoinAddress,
			type = URI.checked ? 'URI' : '',
			amount = $("#amount").value || 0,
			label = $("#label").value || "",
			sentence = 'Please donate bitcoins to: ',
			button = $('#showcase').firstElementChild,
			attributes = [];


		button.getElementsByTagName('img')[0].src = 'https://raw.github.com/adius/bitcoinate/v0.1.2/img/bitcoinate' + buttonSize + '.png';
		button.title = sentence + donateAddress;
		button.dataset.size = buttonSize;
		button.dataset.address = donateAddress;
		type ? button.dataset.type = type : delete button.dataset.type;
		(amount && URI.checked) ? button.dataset.amount = amount : delete button.dataset.amount;
		(label && URI.checked) ? button.dataset.label = label : delete button.dataset.label;

		$('#optional').style.display = URI.checked ? 'block' : 'none';

		//Build HTML-Code
		attributes.push('class="bitcoinate"')
		attributes.push('data-size="' + buttonSize + '"')
		attributes.push('data-address="' + donateAddress + '"')

		if(URI.checked) {
			if(type) attributes.push('data-type="' + type + '"')
			if(amount) attributes.push('data-amount="' + amount + '"')
			if(label) attributes.push('data-label="' + label + '"')
		}

		$("#htmlCode").innerHTML = "<button " + attributes.join(' ') + ">bitcoinate</button>"
	}

	for(i = 0; i < areas.length; i++) {
		areas[i].addEventListener('click', function() {
			this.select();
		}, false);
	}

})(window, document);