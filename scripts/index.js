((window, document) => {

  const myBitcoinAddress = '1LFk8i74MTBEKfViAfvKsbX4mG2iFfRiBF'
  const areas = document.getElementsByTagName('textarea')
  const elements = document.forms[0].elements

  function select (query) {
    query = document.querySelectorAll(query)

    return query[1] ? query : query[0]
  }

  const URI = select('#URI')

  select('#logo')
    .addEventListener('click', () => {
      window.prompt('Please donate bitcoins to:', myBitcoinAddress)
    }, false)

  for (let index = 0; index < elements.length; index++) {
    elements[index].addEventListener('input', update, false)
    elements[index].addEventListener('change', update, false)
  }

  function update () {
    const buttonSize = select('#buttonSize').value
    const donateAddress = select('#donateAddress').value || myBitcoinAddress
    const type = URI.checked ? 'URI' : ''
    const amount = select('#amount').value || 0
    const label = select('#label').value || ''
    const sentence = 'Please donate bitcoins to: '
    const button = select('#showcase').firstElementChild
    const attributes = []


    button.title = sentence + donateAddress
    button.dataset.size = buttonSize
    button.dataset.address = donateAddress

    if (type) {
      button.dataset.type = type
    }
    else {
      delete button.dataset.type
    }

    if (amount && URI.checked) {
      button.dataset.amount = amount
    }
    else {
      delete button.dataset.amount
    }

    if (label && URI.checked) {
      button.dataset.label = label
    }
    else {
      delete button.dataset.label
    }

    select('#optional').style.display = URI.checked ? 'block' : 'none'

    // Build HTML-Code
    attributes.push('class="bitcoinate"')
    attributes.push('data-size="' + buttonSize + '"')
    attributes.push('data-address="' + donateAddress + '"')

    if (URI.checked) {
      if (type) attributes.push('data-type="' + type + '"')
      if (amount) attributes.push('data-amount="' + amount + '"')
      if (label) attributes.push('data-label="' + label + '"')
    }

    select('#htmlCode').innerHTML = '<button ' +
      attributes.join(' ') + '>bitcoinate</button>'
  }

  for (let index = 0; index < areas.length; index++) {
    areas[index].addEventListener('click', function () {
      this.select()
    }, false)
  }

})(window, document)
