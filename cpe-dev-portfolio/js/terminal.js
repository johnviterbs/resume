const input = document.getElementById('terminal-input');
const body = document.getElementById('terminal-body');

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = input.value.trim().toLowerCase();
    input.value = '';

    const line = document.createElement('p');
    line.innerHTML = `<span style="color: #00f2fe;">cpe@galicia-sys:~$</span> ${cmd}`;
    body.appendChild(line);

    let response = '';
    if (cmd === 'help') {
      response = 'Available commands: sysinfo, fpv, soldering, pctweaks, firmware, projects, ncii, clear';
    } else if (cmd === 'sysinfo') {
      response = 'Name: John Viterbs A. Galicia | Track: Computer Engineering | Specialization: Hardware Diagnostics, Firmware & FPV Systems';
    } else if (cmd === 'fpv') {
      response = 'FPV Specs: Custom 3"/4" Quadcopters, KK2.1.5 / KK2.1.5 Plus FC Reprogramming, RadioMaster ELRS (EdgeTX), ESC Tuning.';
    } else if (cmd === 'soldering') {
      response = 'Hardware Repairs: Component-level micro-soldering & desoldering, REAIM T12 rework, ShortSaver smoke stopper testing, PCB diagnostics.';
    } else if (cmd === 'pctweaks') {
      response = 'PC Services: OS Re-formatting & clean deployments, ThrottleStop thermal tuning, custom cooling mods, BIOS/Firmware updates.';
    } else if (cmd === 'firmware') {
      response = 'Firmware Tools: MTKClient, SP Flash Tool, USBasp, avrdude (ATmega644PA / ATmega328P / ESP32 / Mobile Chipsets).';
    } else if (cmd === 'projects') {
      response = 'Projects: AeroSphere Capstone, KK2.1.5 Plus FPV Quadcopter, Spidey 18-Servo Hexapod, VAELON Vault, LabReserve System.';
    } else if (cmd === 'ncii') {
      response = 'TESDA Credential: NC II Certified (Viewable via top-left dashboard modal).';
    } else if (cmd === 'clear') {
      body.innerHTML = '';
      return;
    } else {
      response = `Command not recognized: '${cmd}'. Type 'help' for available diagnostic commands.`;
    }

    const resLine = document.createElement('p');
    resLine.style.color = '#94a3b8';
    resLine.innerText = response;
    body.appendChild(resLine);
    body.scrollTop = body.scrollHeight;
  }
});