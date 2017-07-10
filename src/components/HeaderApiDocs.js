import React from 'react'

const HeaderApiDocs = () =>
  <header className="py2 md-p0 flex items-center bg-blue white">
    <div className="flex-auto items-baseline px2 md-px6">
      <div className="center">
        <span className="mb1 fs-10 md-fs-12 caps bold line-height-1 blue-light-508 block">
          Federal Bureau of Investigation
        </span>
        <a href="/" className="fs-24 md-fs-32 serif line-height-1 white">
          Crime Data Explorer
        </a>
      </div>
    </div>
  </header>

HeaderApiDocs.propTypes = {}

export default HeaderApiDocs
