function countWord(search, words) {
    let i = 0;
    for(let word of words){
        if(word === search){
            i++;
        }
    }
	return i;
}
