export const option = {
  'particles': {
    'number': {
      'value': 20,
      'density': {
        'enable': true,
        'value_area': 1000
      }
    },
    'color': {
      'value': '#fff'
    },
    'shape': {
      'type': 'circle',
      'stroke': {
        'width': 1,
        'color': '#555'
      },
      'polygon': {
        'nb_sides': 1
      },
      'image': {
        'src': 'img/github.svg',
        'width': 100,
        'height': 100
      }
    },
    'opacity': {
      'value': 1,
      'random': true,
      'anim': {
        'enable': true,
        'speed': 0.5,
        'opacity_min': 0.1,
        'sync': false
      }
    },
    'size': {
      'value': 2,
      'random': true,
      'anim': {
        'enable': true,
        'speed': 1,
        'size_min': 0.1,
        'sync': false
      }
    },
    'line_linked': {
      'enable': true,
      'distance': 300,
      'color': '#999',
      'opacity': 0.1,
      'width': 1
    },
    'move': {
      'enable': true,
      'speed': 1,
      'direction': 'none',
      'random': true,
      'straight': false,
      'out_mode': 'out',
      'bounce': true,
      'attract': {
        'enable': false,
        'rotateX': 200,
        'rotateY': 200
      }
    }
  },
  'interactivity': {
    'detect_on': 'canvas',
    'events': {
      'onhover': {
        'enable': true,
        'mode': 'grab'
      },
      'onclick': {
        'enable': true,
        'mode': 'push'
      },
      'resize': true
    },
    'modes': {
      'grab': {
        'distance': 300,
        'line_linked': {
          'opacity': 1
        }
      },
      'bubble': {
        'distance': 800,
        'size': 80,
        'duration': 2,
        'opacity': 0.8,
        'speed': 3
      },
      'repulse': {
        'distance': 400,
        'duration': 0.4
      },
      'push': {
        'particles_nb': 5
      },
      'remove': {
        'particles_nb': 2
      }
    }
  },
  'retina_detect': true
};
