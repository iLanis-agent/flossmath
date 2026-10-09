/* Floss math - exact cross-stitch planning arithmetic on labeled craft norms. */
const r2 = x => Math.round(x * 100) / 100;
const bad = m => { throw new Error(m); };
const pos = (v, m) => { if (!Number.isFinite(v) || v <= 0) bad(m); };

function size(stitchW, stitchH, countPerIn, marginIn) {
  pos(stitchW, 'stitch width must be positive'); pos(stitchH, 'stitch height must be positive');
  pos(countPerIn, 'fabric count must be positive');
  if (!Number.isFinite(marginIn) || marginIn < 0) bad('margin cannot be negative');
  const wIn = stitchW / countPerIn, hIn = stitchH / countPerIn;
  const cutW = wIn + 2 * marginIn, cutH = hIn + 2 * marginIn;
  const verdict = wIn < 4 ? 'a card or an ornament (labeled)' :
    wIn < 10 ? 'a hoop piece (labeled)' :
    wIn < 20 ? 'wall art (labeled)' : 'a multi-month epic (labeled)';
  return {
    finishedWIn: r2(wIn), finishedHIn: r2(hIn),
    finishedWCm: r2(wIn * 2.54), finishedHCm: r2(hIn * 2.54),
    cutWIn: r2(cutW), cutHIn: r2(cutH), verdict
  };
}

function floss(totalStitches, cmPerStitch, skeinM, skeinStrands, strandsUsed) {
  pos(totalStitches, 'total stitches must be positive'); pos(cmPerStitch, 'floss per stitch must be positive');
  pos(skeinM, 'skein length must be positive'); pos(skeinStrands, 'skein strands must be positive');
  pos(strandsUsed, 'strands used must be positive');
  if (strandsUsed > skeinStrands) bad('cannot stitch with more strands than the skein has');
  const threadM = skeinM * (skeinStrands / strandsUsed);
  const needCm = totalStitches * cmPerStitch;
  const skeins = Math.ceil(needCm / (threadM * 100));
  const verdict = skeins === 1 ? 'one skein does it (labeled)' :
    skeins <= 4 ? 'a small floss order (labeled)' : 'a floss haul - check the dye lots (labeled)';
  return { threadPerSkeinM: r2(threadM), needM: r2(needCm / 100), skeins, verdict };
}

function gridlines(stitchW, stitchH, everyN) {
  pos(stitchW, 'stitch width must be positive'); pos(stitchH, 'stitch height must be positive');
  pos(everyN, 'grid step must be positive');
  if (!Number.isInteger(everyN)) bad('grid step must be a whole number');
  const v = Math.floor((stitchW - 1) / everyN), h = Math.floor((stitchH - 1) / everyN);
  return { vertical: v, horizontal: h, total: v + h };
}

const api = { size, floss, gridlines };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (typeof window !== 'undefined') window.Flossmath = api;
