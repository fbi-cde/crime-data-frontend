/* eslint-disable */
(function () {
  function changeApiKey(apiKey) {
  var auth = new SwaggerClient.ApiKeyAuthorization('api_key', apiKey, 'query')
  window.swaggerUi.api.clientAuthorizations.add('auth_name', auth)
  }

  function handleApiKeyChange(e) {
    e.preventDefault()
    var val = $('#api-key').val()
    changeApiKey(val)
    updateCurrentApiKeyUI(val)
  }

  function restructureEndpointHeadings() {
    $('.resource > .heading').each(function(i, heading) {
      var $heading = $(heading)
      var $h2 = $heading.children('h2')
      var $options = $heading.children('.options')
      var $flex = $('<div class="flex flex-justify"></div>')
      var split = $h2.text().split(' : ')
      var $p = $('<p class="mb0"></p>')
      if (split.length === 1) return
      $h2.text(split[0])
      $p.text(split[1])
      $flex.append($h2)
      $flex.append($options)
      $heading.append($flex)
      $heading.append($p)
    })
  }

  function sanitize(str) {
    var div = document.createElement('div')
    div.appendChild(document.createTextNode(str))
    return div.innerHTML
  }

  function showApiKeyForm() {
    var $container = $('#api-key-container')
    var $target = $('#api_info')
    $target.append($container)
    $container.removeClass('hide')
  }

  function updateCurrentApiKeyUI(newKey) {
    var cleaned = sanitize(newKey)
    var $container = $('#api-key-current')
    $container.removeClass('hide')
    $container.children('#current').text(cleaned)
  }

  window.swaggerUi = new SwaggerUi({
    url: '/api-proxy/v2/api-docs',
    dom_id: 'swagger-ui',
    operationsSorter: 'alpha',
    docExpansion: 'list',
    onComplete: function onComplete() {
      showApiKeyForm()
      $('#api-key-container').on('submit', handleApiKeyChange)
      restructureEndpointHeadings()
    },
  })

  window.swaggerUi.load()

  var docsKey = 'iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv'
  changeApiKey(docsKey)
  updateCurrentApiKeyUI(docsKey)
  $('#api-key').val(docsKey)
}())
