import React from 'react'

function QrImage({qrImg,invitationCode}) {
  return (
    <div>
      <img src={qrImg} alt={invitationCode}/>
    </div>
  )
}

export default QrImage
