import React from 'react'
import Helmet from 'react-helmet'

const content = `
  <link rel="stylesheet" href="/swagger/vendor/css/screen.css" media="screen" />
  <link rel="stylesheet" href="/swagger/crime-data-style.css" />

  <div class="swagger-section container mx-auto my3">
    <form class="bg-white hide p3" id="api-key-container">
      <div>
        <label class="block bold mb1 serif" for="api-key">Add your API key</label>
        <input class="border border-blue col-6 monospace" type="text" id="api-key">
        <button type="submit" class="btn btn-primary">Update</button>
      </div>
      <p class="mb0 mt1">You can signup for one at <a class="underline" href="https://api.data.gov/signup/">https://api.data.gov/signup/</a>.</p>
      <div class="hide" id="api-key-current">
        <span class="bold">Current API key:</span>
        <span class="monospace mr1" id="current"></span>
      </div>
    </form>
    <div class="swagger-ui-wrap" id="swagger-ui">
      <div class="mt3 mb8 fs-14 caps sans-serif center">
        <img class="align-middle mr1" width="30" height="30" src="/img/loading.svg" alt="loading..." />
        <span>Loading...</span>
      </div>
    </div>
  </div>

  <script src="/swagger/vendor/lib/object-assign-pollyfill.js"></script>
  <script src="/swagger/vendor/lib/jquery-1.8.0.min.js"></script>
  <script src="/swagger/vendor/lib/jquery.slideto.min.js"></script>
  <script src="/swagger/vendor/lib/jquery.wiggle.min.js"></script>
  <script src="/swagger/vendor/lib/jquery.ba-bbq.min.js"></script>
  <script src="/swagger/vendor/lib/handlebars-4.0.5.js"></script>
  <script src="/swagger/vendor/lib/lodash.min.js"></script>
  <script src="/swagger/vendor/lib/backbone-min.js"></script>
  <script src="/swagger/vendor/swagger-ui.js"></script>
  <script src="/swagger/vendor/lib/highlight.9.1.0.pack.js"></script>
  <script src="/swagger/vendor/lib/highlight.9.1.0.pack_extended.js"></script>
  <script src="/swagger/vendor/lib/jsoneditor.min.js"></script>
  <script src="/swagger/vendor/lib/marked.js"></script>
  <script src="/swagger/vendor/lib/swagger-oauth.js"></script>
  <script>
  ;(function() {
    window.swaggerUi = new SwaggerUi({
      url: 'https://crime-data-api.fr.cloud.gov/static/swagger.json',
      dom_id: 'swagger-ui',
      operationsSorter: 'alpha',
      docExpansion: 'list',
      onComplete: function() {
        showApiKeyForm()
        $('#api-key-container').on('submit', handleApiKeyChange)
        addCssClasses()
        restructureEndpointHeadings()
      },
    })

    function addCssClasses() {
      $('.info_description.markdown > p').each(function(_, p) {
        $(p).addClass('sans-serif')
      })
    }

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

    window.swaggerUi.load()

    const docsKey = 'iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv'
    changeApiKey(docsKey)
    updateCurrentApiKeyUI(docsKey)
    $('#api-key').val(docsKey)
  })()
  </script>
`

const ApiDocs = () =>
  <div className="swagger-section container mx-auto my3">
    <Helmet title="CDE :: API Docs" />
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>

export default ApiDocs
