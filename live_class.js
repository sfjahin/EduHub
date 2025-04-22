const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const startCall = document.getElementById("startCall");
const shareScreen = document.getElementById("shareScreen");

let localStream;
let peerConnections = {}; // Multiple connections

const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

// Start Call
async function startLiveClass() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        users.forEach(user => {
            if (user !== "<?= $current_user ?>") {
                let pc = new RTCPeerConnection(servers);
                peerConnections[user] = pc;

                localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

                pc.ontrack = event => {
                    remoteVideo.srcObject = event.streams[0];
                };

                pc.onicecandidate = event => {
                    if (event.candidate) {
                        console.log(`ICE Candidate for ${user}:`, event.candidate);
                    }
                };

                pc.createOffer().then(offer => {
                    pc.setLocalDescription(offer);
                    console.log(`Offer created for ${user}:`, offer);
                });
            }
        });

    } catch (error) {
        console.error("❌ Error starting live class:", error);
    }
}

// Screen Sharing
async function startScreenSharing() {
    try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        users.forEach(user => {
            if (peerConnections[user]) {
                screenStream.getTracks().forEach(track => peerConnections[user].addTrack(track, screenStream));
            }
        });
    } catch (error) {
        console.error("❌ Error sharing screen:", error);
    }
}

startCall.addEventListener("click", startLiveClass);
shareScreen.addEventListener("click", startScreenSharing);