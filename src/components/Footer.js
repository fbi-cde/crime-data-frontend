import React from 'react'
import { Link } from 'react-router'

const footerLinks = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/',
    text: 'Explorer',
  },
  {
    href: '/downloads-and-docs',
    text: 'Downloads & Documentation',
  },
  {
    href: '/about',
    text: 'About',
  },
  {
    href: '/',
    text: 'Accessibility',
  },
  {
    href: '/',
    text: 'Privacy Policy',
  },
  {
    href: '/',
    text: 'License',
  },
  {
    href: '/',
    text: 'Feedback',
  },
]

const firstCls = 'border-white border-right pr2 white'
const lastCls = 'pl2 white'
const linkCls = 'border-white border-right px2 white'

const Footer = () => (
  <footer className='py3 bg-blue white'>
    <div className='container items-center px2 md-px3'>
      <div className='sm-col sm-col-6'>
        <div className='h6 caps bold blue-gray'>Federal Bureau of Investigation</div>
        <div className='h2 serif line-height-3'>Crime Data Explorer</div>
        <div className='my2'>
          {['FBI', 'CJIS'].map((l, i) => (
            <div
              className='p2 mr1 inline-block border border-white'
              key={i}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
      <div className='sm-col sm-col-6 sm-col-right h6'>
        <div className='pt1 pb3 bold caps'>
          { footerLinks.map((l, i) => {
            const isFirst = (i === 0)
            const isLast = (i === footerLinks.length - 1)
            const cls = (isFirst && firstCls) || (isLast && lastCls) || linkCls
            return (
              <Link
                className={cls || linkCls}
                key={i}
                to={l.href}
              >
                {l.text}
              </Link>
            )
          })}
        </div>
        <div className='fs3'>
          <div className='bold fs2 serif red-bright'>Contact us</div>
          <div className='bold mt2'>Criminal Justice Information Services (CJIS) Division</div>
          <a
            className='border-white border-right pr1 white'
            href='mailto:cjis_comm@leo.gov'
          >
            cjis_comm@leo.gov
          </a>
          <a className='pl1 white' href='tel:3046254995'>(304) 625-4995</a>
        </div>
        <div className='fs3 mt2'>
          <div className='bold'>FBI Uniform Crime Reporting Program</div>
          <p className='white m0'>
            <span className='border-white border-right pr1'>
              1000 Custer Hollow Road
            </span>
            <span className='pl1'>Clarksburg, WV 26306</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
