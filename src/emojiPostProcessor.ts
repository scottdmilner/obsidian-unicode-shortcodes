import { MarkdownPostProcessor } from "obsidian";
import { unicode as emoji } from "./unicodeList";

export default class EmojiMarkdownPostProcessor {

    static emojiProcessor: MarkdownPostProcessor = (el: HTMLElement) => {
		el.innerText.match(/[:][^\s:][^ \n:]*[:]/g)?.forEach((e: keyof typeof emoji) => EmojiMarkdownPostProcessor.emojiReplace(e, el)); 
	}

	static emojiReplace(shortcode: keyof typeof emoji, el: HTMLElement){
		if ((typeof el.tagName ==="string") && (el.tagName.indexOf("CODE") !== -1 || el.tagName.indexOf("MJX") !== -1)) {
			return false;
		}
		if (el.hasChildNodes()){
			el.childNodes.forEach((child: ChildNode) => this.emojiReplace(shortcode, child as HTMLElement));
		} else {
			el.textContent = el.textContent.replace(shortcode as string, emoji[shortcode] ?? shortcode);
		}
	}

}
