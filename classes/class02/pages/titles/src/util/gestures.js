const { GestureDescription, Finger, FingerCurl } = window.fp

const ScrollDownGesture = new GestureDescription('scroll-down') // ✊️
const ScrollUpGesture = new GestureDescription('scroll-up') // 🖐
const ScrollHomeGesture = new GestureDescription('scroll-home') // 


// Scroll Down
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5)

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0)
  ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9)
}


// ScrollUp
// -----------------------------------------------------------------------------

// no finger should be curled
for (let finger of Finger.all) {
  ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0)
}

// Scroll Home
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
ScrollHomeGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)

// all other fingers: curled
for (let finger of [Finger.Middle, Finger.Ring]) {
  ScrollHomeGesture.addCurl(finger, FingerCurl.FullCurl, 1.0)
  ScrollHomeGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9)
}

for (let finger of [Finger.Index, Finger.Pinky]) {
  ScrollHomeGesture.addCurl(finger, FingerCurl.NoCurl, 1.0)
}


const knownGestures = [
  ScrollDownGesture,
  ScrollUpGesture,
  ScrollHomeGesture,
]

const gestureStrings = {
  'scroll-up': '🖐',
  'scroll-down': '✊️',
  'scroll-home': '🤙'
}

export {
  knownGestures,
  gestureStrings
}