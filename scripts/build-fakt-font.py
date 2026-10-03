"""Build Fakt webfonts: python build-fakt-font.py '/path/to/FaktPro Normal.ttf'.

Requires fonttools[woff]. The original desktop font stays outside the repository.
"""

import argparse
from html import unescape
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('source', type=Path)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
destination = root / 'src/assets/fonts'
destination.mkdir(parents=True, exist_ok=True)

# Keep Latin, accents, punctuation and currencies for future English/European
# text, plus every character currently used in the site's source.
characters = set()
for first, last in ((0x20, 0x24F), (0x300, 0x36F), (0x1E00, 0x1EFF),
                    (0x2000, 0x206F), (0x20A0, 0x20CF)):
    characters.update(range(first, last + 1))
for path in (root / 'src').rglob('*'):
    if path.suffix in {'.astro', '.svelte', '.mdx', '.md', '.ts', '.tsx'}:
        characters.update(map(ord, unescape(path.read_text())))

with TTFont(args.source) as original:
    source_cmap = original.getBestCmap()
    expected = characters & source_cmap.keys()
    source_metrics = {cp: original['hmtx'][source_cmap[cp]] for cp in expected}
    original_glyphs = len(original.getGlyphOrder())

for flavor in ('woff2', 'woff'):
    with TTFont(args.source, recalcTimestamp=False) as font:
        options = subset.Options()
        options.layout_features = ['*']
        options.name_IDs = ['*']  # Preserve copyright and licensing metadata.
        options.glyph_names = True
        options.notdef_outline = True
        options.recommended_glyphs = True
        options.drop_tables += ['FFTM']
        subsetter = subset.Subsetter(options=options)
        subsetter.populate(unicodes=characters)
        subsetter.subset(font)
        font.flavor = flavor
        output = destination / f'FaktPro-Normal-latin.{flavor}'
        font.save(output)

    # Reopen the compressed result and check coverage and original metrics.
    with TTFont(output) as result:
        cmap = result.getBestCmap()
        assert expected <= cmap.keys(), 'Subset lost a supported character'
        assert all(result['hmtx'][cmap[cp]] == source_metrics[cp] for cp in expected)
        print(f'{output.name}: {output.stat().st_size:,} bytes, '
              f'{len(result.getGlyphOrder())}/{original_glyphs} glyphs')
