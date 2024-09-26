// おとならす
// https://toranoana-lab.hatenablog.com/entry/2020/01/17/182638
const score = [
  { note: "C4", dur: "4n" },
  { note: "B4", dur: "8n" },
  { note: "D4", dur: "2n" },
];

// //音の種類を設定
// const syn = new Tone.PolySynth().toMaster();

// // メロディをシーケンス制御の内容を定義
// const melody = new Tone.Sequence((time, { note, dur }) => {
//   // 音を鳴らす。
//   syn.triggerAttackRelease(note, dur, time, 0.3);
// }, score).start();

// // ループを回数設定
// melody.loop = 0;

// const soundstart = () => {
//   Tone.Transport.start();
//   //2秒たったなら、再生をリセット
//   setTimeout(() => {
//     Tone.Transport.stop();
//   }, 2000);
// };
// document.getElementById("start").onclick = soundstart;

// https://tonejs.github.io/docs/14.7.77/Recorder
const soundstart = () => {
  const recorder = new Tone.Recorder();
  const synth = new Tone.Synth().connect(recorder);
  recorder.start();

  const melody = new Tone.Sequence((time, { note, dur }) => {
    synth.triggerAttackRelease(note, dur, time, 0.3);
  }, score).start();
  melody.loop = 2;
  Tone.Transport.start();
  setTimeout(async () => {
    const recording = await recorder.stop();
    const url = URL.createObjectURL(recording);
    const anchor = document.createElement("a");
    anchor.download = "recording.webm";
    anchor.href = url;
    anchor.click();
  }, 4000);
};
document.getElementById("start").onclick = soundstart;
