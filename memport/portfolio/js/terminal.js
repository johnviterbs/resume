const input = document.getElementById('terminal-input');
const body = document.getElementById('terminal-body');

if (input && body) {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      input.value = '';

      const line = document.createElement('p');
      line.innerHTML = `<span style="color: #00f2fe;">cpe@galicia-sys:~$</span> ${cmd}`;
      body.appendChild(line);

      let response = '';
      if (cmd === 'help') {
        response = 'Available commands: 1. sysinfo, 2. app, 3. fpv, 4. soldering, 5. pctweaks, 6. firmware, 7. projects, 8. ncii, 9. clear';
      } else if (cmd === 'sysinfo') {
        response = 'Name: John Viterbs A. Galicia | Track: Computer Engineering | Specialization: Hardware Diagnostics, Firmware, Mobile Apps & FPV Systems';
      } else if (cmd === 'app') {
        response = 'Mobile App Success: AeroSphere (GT Plant Care) successfully uploaded and verified on APKPure console (v1.0 package: com.example.gtplantcare).';
      } else if (cmd === 'fpv') {
        response = 'FPV Specs: Custom 3"/4" Quadcopters, KK2.1.5 / KK2.1.5 Plus FC Reprogramming, RadioMaster ELRS (EdgeTX).';
      } else if (cmd === 'soldering') {
        response = 'Hardware Repairs: Component-level micro-soldering & desoldering, REAIM T12 rework, ShortSaver testing.';
      } else if (cmd === 'pctweaks') {
        response = 'PC Services: OS Re-formatting & clean deployments, ThrottleStop thermal tuning, custom cooling mods.';
      } else if (cmd === 'firmware') {
        response = 'Firmware Tools: MTKClient, SP Flash Tool, USBasp, avrdude (ATmega & Mobile Chipsets).';
      } else if (cmd === 'projects') {
        response = 'Projects: AeroSphere APKPure App, Spidey Hexapod, VAELON Vault, LabReserve System, WalletCrocs.';
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
}