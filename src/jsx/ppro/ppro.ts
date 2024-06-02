
function removePunctuation(srtContent: string): string {
    // Split the content by new lines
    let lines = srtContent.split('\n');
    // Regular expression to match any punctuation
    let punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g;

    // Iterate through each line and remove punctuation from subtitle text
    for (let i = 0; i < lines.length; i++) {
        // Check if the line contains timing (formatted as '00:00:00,000 --> 00:00:00,000')
        if (!lines[i].match(/^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}$/)) {
            // Remove punctuation from this line
            lines[i] = lines[i].replace(punctuationRegex, "");
        }
    }

    // Join the lines back together
    return lines.join('\n');
}

function endsWith(s: string, end: string): boolean {
    var ending = s.substr(-end.length, end.length);
    return ending == end;
}

export function findSubtitle(punctuated: boolean): ProjectItem | null {
    var subtitleItem = null;
    for (var i = 0; i < app.project.rootItem.children.numItems; i++) {
        var childItem = app.project.rootItem.children[i];

        if (endsWith(childItem.name, '.srt')) {
            const nopunch_extension = endsWith(childItem.name, 'nopunc.srt');
            if ((!punctuated && nopunch_extension)
                || (punctuated && !nopunch_extension)) {
                subtitleItem = childItem;
            }
     
        }
    }

    return subtitleItem
}

export function duplicateSubtitles(item: ProjectItem) {
    const file = new File(item.getMediaPath());

    file.open('r');
    file.encoding = 'UTF8';
    var text = file.read();
    // text = removePunchtio
    file.close();
    const new_path = file.parent.fsName + "/" + file.name + '.nopunc.srt';

    const res_file = new File(new_path);
    let exists = res_file.exists;
    res_file.open('w');
    res_file.encoding = 'UTF8';

    res_file.write(removePunctuation(text));
    res_file.close();

    if (!exists) {
        // if it exists just alter the media   
        app.project.importFiles([new_path]);
    }

}

export function addSubtitles(punctuated: boolean) {
    let subtitleItem = findSubtitle(punctuated);
    if (subtitleItem) {
        if (punctuated) {
            duplicateSubtitles(subtitleItem);
        }
        app.project.activeSequence.createCaptionTrack(subtitleItem, 0, Sequence.CAPTION_FORMAT_SUBTITLE);
        alert('ok')
    } else {
        alert('srt not found');
    }
}

