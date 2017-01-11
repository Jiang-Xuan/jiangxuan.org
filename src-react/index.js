import React from 'react'
import { render } from 'react-dom'

import './index.less'

class Home extends React.Component {
  static initArray(len) {
    let temp = [] // eslint-disable-line prefer-const
    for (let i = 0; i < len; i += 1) {
      temp.push(i)
    }
    return temp
  }
  constructor(props) {
    super(props)
    this.shard = Home.initArray(32)
    this.playOrPauseAudio = this.playOrPauseAudio.bind(this)
  }

  componentDidMount() {
    const node = document.querySelectorAll('polyline:nth-child(n+27) animate')
    const aniOneValues = '154.4,53.22128000000001 278,150.45935968 166,86.43415984; 126.4,109.24368000000001 278,150.45935968 166,86.43415984; 154.4,53.22128000000001 278,150.45935968 166,86.43415984'
    const aniTwoValues = '229.6,80.43135968000001 278,150.85991984 249.6,124.05040032000002; 213.60000000000002,114.04479968000001 278,150.85991984 181.6,118.44816032000001; 229.6,80.43135968000001 278,150.85991984 249.6,124.05040032000002'
    const aniThreeValues = '178.8,81.23248 206,28.011200000000002 250,124.45096048000002; 170.8,126.05040000000001 182,84.0336 222.00000000000003,116.04760048000003; 178.8,81.23248 206,28.011200000000002 250,124.45096048000002'
    const aniFourValues = '178.8,81.23248 160,27.61063984 206.4,28.411760160000004; 170.8,126.05040000000001 136,89.23527984000002 182.4,84.43416016000002; 178.8,81.23248 160,27.61063984 206.4,28.411760160000004'

    setInterval(() => {
      this.shimmer.classList.toggle('shimmer')
    }, 6e3)

    setInterval(() => {
      setTimeout(() => {
        this.shimmer.classList.add('two-state-two')
        node[0].setAttribute('values', aniOneValues)
        node[1].setAttribute('values', aniTwoValues)
        node[2].setAttribute('values', aniThreeValues)
        node[3].setAttribute('values', aniFourValues)
      }, 1e3)
      setTimeout(() => {
        this.shimmer.classList.remove('two-state-two')
        node[0].removeAttribute('values')
        node[1].removeAttribute('values')
        node[2].removeAttribute('values')
        node[3].removeAttribute('values')
      }, 1500)
      setTimeout(() => {
        this.shimmer.classList.add('two-state-two')
        node[0].setAttribute('values', aniOneValues)
        node[1].setAttribute('values', aniTwoValues)
        node[2].setAttribute('values', aniThreeValues)
        node[3].setAttribute('values', aniFourValues)
      }, 2400)
      setTimeout(() => {
        this.shimmer.classList.remove('two-state-two')
        node[0].removeAttribute('values')
        node[1].removeAttribute('values')
        node[2].removeAttribute('values')
        node[3].removeAttribute('values')
      }, 3000)
    }, 4e3)
  }

  playOrPauseAudio() {
    let audio = this.audio // eslint-disable-line prefer-const
    if (audio.paused) {
      audio.play()
    } else {
      audio.pause();
    }
  }


  render() {
    return (
      <div className="box-with-text" id="welcome" ref={(ele) => { this.shimmer = ele }}>
        <svg height="280.112" width="400" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 400 280.112" id="svg-picture" onClick={this.playOrPauseAudio}>
          <polyline
            points="67.2,157.26328016000002 85.6,151.66104016 76.4,168.0672 "
            fill="#272729"
          />
          <polyline
            points="85.6,151.66104016 99.2,168.46776016 76,168.0672 "
            fill="#A72A34"
          />
          <polyline
            points="85.6,151.66104016 110.00000000000001,153.66103984 98.8,168.86832032000004 "
            fill="#C4334A"
          />
          <polyline
            points="98.8,168.46776016 110.00000000000001,153.781488 117.6,166.46776048 "
            fill="#101F1F"
          />
          <polyline
            points="109.59999999999998,153.501376 137.2,166.946752 117.19999999999999,166.386528 "
            fill="#2C292D"
          />
          <polyline
            points="109.59999999999998,153.66103984 128,151.66104016 136.8,167.506976 "
            fill="#3C3A42"
          />
          <polyline
            points="127.60000000000001,151.66104016 151.2,152.85991952000003 136.08,166.946752 "
            fill="#272729"
          />
          <polyline
            points="136,166.86551952 150.4,152.85991952000003 159.2,164.86551984000002 "
            fill="#BA223A"
          />
          <polyline
            points="150,152.85991952000003 175.6,158.06440048000005 158.8,164.86551984000002 "
            fill="#C4304A"
          />
          <polyline
            points="150,152.85991952000003 192,153.26047968 174,158.46215952 "
            fill="#DE4C63"
          />
          <polyline
            points="158.8,164.86551984000002 174,158.06440048000005 190,166.46776048 "
            fill="#9A2A3C"
          />
          <polyline
            points="173.6,158.06440048000005 191.96,153.26047968 201.6,158.54339200000004 "
            fill="#BB293A"
          />
          <polyline
            points="173.6,157.66384032000002 201.6,158.06440048000005 189.6,166.86551952 "
            fill="#C52F49"
          />
          <polyline
            points="192,153.26047968 224.40000000000003,150.85991984 201.2,158.46215952 "
            fill="#DE4C63"
          />
          <polyline
            points="189.6,166.46776048
                    201.2,158.06440048000005
                    213.60000000000002,164.46495968000002 "
            fill="#8D233B"
          />
          <polyline
            points="201.2,158.06440048000005
                    224.40000000000003,150.85991984
                    213.60000000000002,164.86551984000002 "
            fill="#BC2D40"
          />
          <polyline
            points="213.19999999999996,164.42574400000004
                    224.00000000000003,151.26048000000003
                    241.2,164.46495968000002 "
            fill="#A72A34"
          />
          <polyline
            points="223.2,151.26048000000003 257.2,152.85991952000003 241.2,164.46495968000002 "
            fill="#DE3C58"
          />
          <polyline
            points="240.79999999999998,164.46495968000002
                    256.8,152.85991952000003
                    302,165.82630400000005 "
            fill="#181B1F"
          />
          <polyline
            points="257.2,153.081208 262.4,144.05880048000003 310,151.26048000000003 "
            fill="#45424B"
          />
          <polyline
            points="256,152.94115200000002 313.2,150.45935968 301.6,165.99437120000002 "
            fill="#2D2C35"
          />
          <polyline
            points="282.8,165.26608000000002 286,165.66664016000001 266,199.28008016 "
            fill="#262624"
          />
          <polyline
            points="294.4,165.26608000000002 299.6,165.54619200000002 287.6,192.47615968 "
            fill="#333E4E"
          />
          <polyline
            points="289.2,188.87672048000002 317.6,219.68904048000002 287.6,192.87671984000002 "
            fill="#1D2124"
          />
          <polyline
            points="301.6,157.66384032000002 305.6,145.25767984 319.6,151.66104016 "
            fill="#812925"
          />
          <polyline
            points="301.6,157.26328016000002 319.6,151.66104016 313.6,163.66664048 "
            fill="#3B0F13"
          />
          <polyline // 27 126.4,109.24368000000001 278,150.45935968 166,86.43415984
            points="154.4,53.22128000000001 278,150.45935968 166,86.43415984 "
            fill="#6D9B9F"
          >
            <animate attributeType="XML" attributeName="points"
              dur="0.6s" repeatCount="indefinite" keyTimes="0; .5; 1" calcMode="spline"  keySplines=".5 0 .5 1; 0 0 1 1" />
          </polyline>
          <polyline // 28 213.60000000000002,114.04479968000001 278,150.85991984 181.6,118.44816032000001
            points="229.6,80.43135968000001 278,150.85991984 249.6,124.05040032000002 "
            fill="#9ABFC2"
          >
            <animate attributeType="XML" attributeName="points"
              dur="0.6s" repeatCount="indefinite" keyTimes="0; .5; 1" calcMode="spline"  keySplines=".5 0 .5 1; 0 0 1 1" />
          </polyline>
          <polyline // 29 170.8,126.05040000000001 182,84.0336 222.00000000000003,116.04760048000003
            points="178.8,81.23248 206,28.011200000000002 250,124.45096048000002 "
            fill="#80B1B4"
          >
            <animate attributeType="XML" attributeName="points"
              dur="0.6s" repeatCount="indefinite" keyTimes="0; .5; 1" calcMode="spline"  keySplines=".5 0 .5 1; 0 0 1 1" />
          </polyline>
          <polyline // 30 170.8,126.05040000000001 136,89.23527984000002 182.4,84.43416016000002
            points="178.8,81.23248 160,27.61063984 206.4,28.411760160000004 "
            fill="#9ABFC2"
          >
            <animate attributeType="XML" attributeName="points"
            dur="0.6s" repeatCount="indefinite" keyTimes="0; .5; 1" calcMode="spline"  keySplines=".5 0 .5 1; 0 0 1 1" />
          </polyline>
        </svg>
        <div id="picture-wrap">
          <div id="picture" onClick={this.playOrPauseAudio}>
            {
              this.shard.map((item, index) => (
                <div className="shard-wrap" key={index}>
                  <div className="shard" />
                </div>
              ))
            }
          </div>
          <div className="shadow startup-inactive" />
        </div>
        <p id="home"><a href="./home.html">Home</a><a href="https://github.com/Jiang-Xuan" rel="noopener noreferrer" target="_blank">Github</a></p>
        <p>Welcome to Jiang-Xuan blog</p>
        <audio
          src="./source/ambient-loop-piano.mp3"
          preload="metadata"
          ref={(ele) => { this.audio = ele }}
          loop
        />
      </div>
    )
  }
}

// render(
//   <Home />,
//   document.getElementById('container') // eslint-disable-line no-undef
// )


export default Home
