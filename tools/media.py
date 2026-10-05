"""Add photos to an activity:  python tools/media.py <place-id> <photo> [<photo> ...]

For each photo (in shooting order: EXIF time, else file name) it writes
  media/<place-id>/<name>.jpg          the photo, at most 1600 px on the long side
  media/<place-id>/thumbs/<name>.jpg   a square thumbnail: the centre square of the
                                        shortest side (portraits lose top and bottom,
                                        landscapes the sides), resized to 360 px
Re-encoding drops all metadata (GPS included); the EXIF rotation is applied first.
Prints the `media: [...]` line for that place in data.js.
"""
import os
import sys
from PIL import Image, ImageOps

ROOT = os.path.join(os.path.dirname(__file__), '..')
FULL, THUMB = 1600, 360


def shot_time(path):
    try:
        exif = Image.open(path).getexif()
        return exif.get_ifd(0x8769).get(36867) or exif.get(306) or ''  # DateTimeOriginal, DateTime
    except Exception:
        return ''


def flat(im):
    im = ImageOps.exif_transpose(im)
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA')
        bg = Image.new('RGB', im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        return bg
    return im.convert('RGB')


def main(place, files):
    out = os.path.join(ROOT, 'media', place)
    os.makedirs(os.path.join(out, 'thumbs'), exist_ok=True)
    entries = []
    for path in sorted(files, key=lambda f: (shot_time(f), os.path.basename(f))):
        name = os.path.splitext(os.path.basename(path))[0] + '.jpg'
        im = flat(Image.open(path))
        full = im.copy()
        full.thumbnail((FULL, FULL), Image.LANCZOS)
        full.save(os.path.join(out, name), 'JPEG', quality=84, optimize=True, progressive=True)
        side = min(im.size)
        left, top = (im.width - side) // 2, (im.height - side) // 2
        sq = im.crop((left, top, left + side, top + side)).resize((THUMB, THUMB), Image.LANCZOS)
        sq.save(os.path.join(out, 'thumbs', name), 'JPEG', quality=80, optimize=True)
        entries.append(f"'media/{place}/{name}'")
        print(f'  {path} -> media/{place}/{name}  ({full.width}x{full.height})', file=sys.stderr)
    print(f"media: [{', '.join(entries)}],")


if __name__ == '__main__':
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2:])
