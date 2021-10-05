//These are the components that can be rendered from the DocRenderer on any page
import Pullquote from "@/components/global/docs-inclusions/Pullquote.vue"
import Blockquote from "@/components/global/docs-inclusions/Blockquote.vue"
import FootnoteReference from "@/components/global/docs-inclusions/FootnoteReference.vue";
import LocalImage from "@/components/global/docs-inclusions/LocalImage.vue";
import Captioned from "@/components/global/docs-inclusions/Captioned.vue";
import Scrollytell from "@/components/global/docs-inclusions/Scrollytell.vue";
const all = {Pullquote, FootnoteReference, LocalImage, Captioned, Scrollytell, Blockquote}
export default all;
