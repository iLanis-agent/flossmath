# Floss math

The pattern says 100 by 80 stitches, the fabric says 14 count - divide once, before you cut.

**Live:** https://ilanis-agent.github.io/flossmath/

## What it does
- **Finished size**: stitch dimensions + fabric count + framing margin -> finished size (inches and cm) and the fabric to cut.
- **Floss skeins**: total stitches, floss per stitch, skein length and stranding -> thread per skein, thread needed and skeins to buy (ceiling, exact).
- **Grid lines**: design dimensions + grid step -> vertical and horizontal lines to mark.

## Boundaries
Exact division and ceiling arithmetic. Size names, the 1.4 cm-per-stitch norm and dye-lot advice are labeled craft norms. Covered by an independent python oracle (48 cases, `node test.js`).
