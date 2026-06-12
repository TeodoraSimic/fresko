import { Row, Col } from 'react-bootstrap'
import products from '../products_list'
import Product from '../components/Product'

const HomeScreen = () => {
  const categories = [...new Set(products.map((p) => p.category || 'Ostalo'))]

  return (
    <>
      <section className='hero-stage'>
        <img className='floatie f1' src='/images/float/apple.png' alt='' />
        <img className='floatie f2' src='/images/float/banana.png' alt='' />
        <img className='floatie f3' src='/images/float/broccoli.png' alt='' />
        <img className='floatie f4' src='/images/float/carrot.png' alt='' />
        <img className='floatie f5' src='/images/float/grape.png' alt='' />
        <img className='floatie f6' src='/images/float/lemon.png' alt='' />
        <img className='floatie f7' src='/images/float/orange.png' alt='' />
        <img className='floatie f8' src='/images/float/Paprika.png' alt='' />
        <img className='floatie f9' src='/images/float/pear.png' alt='' />
        <img className='floatie f10' src='/images/float/tomato.png' alt='' />

        <div className='hero-stage__content'>
          <span className='section-eyebrow'>✻ sa pijace, sveže svaki dan</span>
          <h1 className='hero-stage__title'>Sveže voće i povrće, pravo na tvoja vrata</h1>
          <p className='hero-stage__text'>
            Domaće, ubrano u zoru i dostavljeno još istog dana.
          </p>
          <a href='#ponuda' className='hero__btn'>Pogledaj asortiman ↓</a>
        </div>
      </section>

      <div id='ponuda'>
        <span className='section-eyebrow'>~ sa naše tezge ~</span>
        <h2 className='section-title'>Današnja ponuda</h2>

        {categories.map((cat) => (
          <section key={cat} className='mb-5'>
            <h3 className='category-title'>{cat}</h3>
            <Row>
              {products
                .filter((p) => (p.category || 'Ostalo') === cat)
                .map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
            </Row>
          </section>
        ))}
      </div>
    </>
  )
}

export default HomeScreen