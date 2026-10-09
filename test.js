const M = require('./engine.js');
const E = require('./expected.json');
let n = 0, fail = 0;
const eq = (a, b, tag) => {
  n++;
  if (JSON.stringify(a) !== JSON.stringify(b)) { fail++; console.error('FAIL', tag, JSON.stringify(a), '!=', JSON.stringify(b)); }
};
for (const c of E.size) { let r; try { r = M.size(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'size ' + c.in); }
for (const c of E.floss) { let r; try { r = M.floss(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'floss ' + c.in); }
for (const c of E.gridlines) { let r; try { r = M.gridlines(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'gridlines ' + c.in); }
// anchors
const s = M.size(100, 80, 14, 3);
eq(s.finishedWIn, 7.14, 'anchor finished w'); eq(s.cutWIn, 13.14, 'anchor cut w'); eq(s.finishedHCm, 14.51, 'anchor finished h cm');
const f = M.floss(5000, 1.4, 8, 6, 2);
eq(f.threadPerSkeinM, 24, 'anchor thread'); eq(f.skeins, 3, 'anchor skeins');
const gl = M.gridlines(100, 80, 10);
eq(gl.vertical, 9, 'anchor grid v'); eq(gl.horizontal, 7, 'anchor grid h');
// invariants
n++;
{
  const q = M.size(140, 100, 16, 3);
  if (Math.abs(q.cutWIn - (q.finishedWIn + 6)) > 0.02) { fail++; console.error('FAIL margin invariant'); }
}
n++;
{
  const q = M.gridlines(200, 160, 10);
  if (q.total !== q.vertical + q.horizontal) { fail++; console.error('FAIL grid sum'); }
}
// errors
const errs = [
  () => M.size(0, 80, 14, 3), () => M.size(100, 0, 14, 3), () => M.size(100, 80, 0, 3), () => M.size(100, 80, 14, -1),
  () => M.floss(0, 1.4, 8, 6, 2), () => M.floss(5000, 0, 8, 6, 2), () => M.floss(5000, 1.4, 0, 6, 2), () => M.floss(5000, 1.4, 8, 0, 2), () => M.floss(5000, 1.4, 8, 6, 0), () => M.floss(5000, 1.4, 8, 6, 7),
  () => M.gridlines(0, 80, 10), () => M.gridlines(100, 0, 10), () => M.gridlines(100, 80, 0), () => M.gridlines(100, 80, 2.5),
];
const msgs = ['stitch width must be positive','stitch height must be positive','fabric count must be positive','margin cannot be negative',
  'total stitches must be positive','floss per stitch must be positive','skein length must be positive','skein strands must be positive','strands used must be positive','cannot stitch with more strands than the skein has',
  'stitch width must be positive','stitch height must be positive','grid step must be positive','grid step must be a whole number'];
errs.forEach((f2, i) => {
  n++;
  try { f2(); fail++; console.error('FAIL no-throw', i); }
  catch (e) { if (e.message !== msgs[i]) { fail++; console.error('FAIL msg', i, e.message, 'want', msgs[i]); } }
});
console.log(fail ? fail + ' FAILURES / ' + n : n + '/' + n + ' checks pass');
process.exit(fail ? 1 : 0);
