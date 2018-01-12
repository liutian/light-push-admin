export const option = {
  'particles': {
    'number': {
      'value': 50,
      'density': {
        'enable': true,
        'value_area': 1500
      }
    },
    'color': {
      'value': '#ffffff'
    },
    'shape': {
      'type': 'circle',
      'stroke': {
        'width': 0,
        'color': '#000000'
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
        'speed': 1.2,
        'opacity_min': 0.1,
        'sync': true
      }
    },
    'size': {
      'value': 3,
      'random': true,
      'anim': {
        'enable': false,
        'speed': 5,
        'size_min': 0.1,
        'sync': false
      }
    },
    'line_linked': {
      'enable': true,
      'distance': 300,
      'color': '#ffffff',
      'opacity': 0.4,
      'width': 2
    },
    'move': {
      'enable': true,
      'speed': 5,
      'direction': 'none',
      'random': true,
      'straight': false,
      'out_mode': 'out',
      'bounce': false,
      'attract': {
        'enable': false,
        'rotateX': 600,
        'rotateY': 1200
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
          'opacity': 0.5
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
