export interface PromptOption {
  id: string;
  label: string;
  value: string; // Format: "English prompt|中文提示词"
  description?: string;
  icon?: any;
}

export const STYLE_OPTIONS: PromptOption[] = [
  { id: 'realistic', label: '📸 真实照片', value: 'photorealistic, ultra realistic, high quality photography|写实摄影，极度逼真，高质量照片', description: '像手机或相机拍出来的一样，非常逼真' },
  { id: 'anime', label: '🌸 日本动漫', value: 'anime style, studio ghibli, makoto shinkai style, 2d illustration|动漫风格，吉卜力工作室，新海诚风格，2D插画', description: '像《你的名字》或宫崎骏动画里的感觉' },
  { id: '3d-blindbox', label: '🧸 3D 潮玩', value: '3d render, octane render, blind box toy style, cute 3d|3D渲染，辛烷渲染，盲盒玩具风格，可爱3D', description: '像泡泡玛特一样的立体可爱小人' },
  { id: 'watercolor', label: '🎨 唯美水彩', value: 'watercolor painting, fluid colors, soft brushstrokes|水彩画，流动色彩，柔和笔触', description: '颜色淡淡的、晕开的水彩画，很温柔' },
  { id: 'cyberpunk', label: '🚀 赛博科幻', value: 'cyberpunk style, neon lights, futuristic city, sci-fi|赛博朋克风格，霓虹灯，未来城市，科幻', description: '充满未来感，有很多发光的霓虹灯' },
  { id: 'pixel', label: '👾 复古像素', value: 'pixel art, 16-bit, retro game style|像素艺术，16位，复古游戏风格', description: '像超级马里奥一样的怀旧游戏画面' },
  { id: 'disney', label: '🏰 迪士尼3D', value: 'disney pixar style, 3d animation movie, soft lighting|迪士尼皮克斯风格，3D动画电影，柔和光照', description: '像迪士尼或皮克斯的动画大电影' },
  { id: 'ink', label: '🖌️ 中国水墨', value: 'traditional chinese ink painting, black and white, zen style|传统中国水墨画，黑白，禅意风格', description: '传统的黑白水墨，非常有中国风意境' },
  { id: 'gothic', label: '🦇 暗黑哥特', value: 'gothic style, dark fantasy, intricate details|哥特风格，黑暗奇幻，错综复杂的细节', description: '有点黑暗、华丽又神秘的感觉' },
  { id: 'steampunk', label: '⚙️ 蒸汽朋克', value: 'steampunk style, brass gears, victorian era|蒸汽朋克风格，黄铜齿轮，维多利亚时代', description: '充满机械齿轮和复古工业感的风格' },
  { id: 'origami', label: '✂️ 折纸纸雕', value: 'origami style, paper cut art, layered paper|折纸风格，剪纸艺术，多层纸张', description: '像用很多层彩纸剪出来拼成的画' },
  { id: 'oil', label: '🖼️ 经典油画', value: 'oil painting, thick brushstrokes, classical art|油画，厚重笔触，古典艺术', description: '博物馆里那种有立体笔触的厚重油画' },
];

export const ACTION_OPTIONS: PromptOption[] = [
  { id: 'standing', label: '🧍 站立静静看着', value: 'standing still, looking at viewer|安静地站着，看着镜头', description: '最基础的动作，适合拍肖像' },
  { id: 'running', label: '🏃 奔跑/冲刺', value: 'running, motion blur, dynamic pose|奔跑，运动模糊，动态姿势', description: '充满动感，感觉马上要跑出画面' },
  { id: 'jumping', label: '🦘 跳跃/飞跃', value: 'jumping in mid-air, floating|在半空中跳跃，悬浮', description: '双脚离地，或者在空中飞翔' },
  { id: 'sitting', label: '🪑 坐着休息', value: 'sitting down, relaxed pose|坐着，放松的姿势', description: '坐在地上、椅子上或边缘，很放松' },
  { id: 'drinking', label: '☕ 喝着饮料', value: 'drinking coffee, holding a cup|喝着咖啡，手里拿着杯子', description: '很生活化的动作，手里端着杯子' },
  { id: 'reading', label: '📖 专注看书', value: 'reading a book, deeply focused|在看书，非常专注', description: '低着头认真看书的样子' },
  { id: 'sleeping', label: '😴 睡觉/闭眼', value: 'sleeping, eyes closed, peaceful|睡觉，闭着眼睛，安详', description: '闭着眼睛，安静地睡着了' },
  { id: 'fighting', label: '⚔️ 战斗姿态', value: 'combat stance, ready to fight, aggressive pose|战斗姿态，准备战斗，攻击性姿势', description: '摆出准备打架的酷炫姿势' },
];

export const PROP_OPTIONS: PromptOption[] = [
  { id: 'umbrella', label: '☂️ 撑着伞', value: 'holding an umbrella|手里撑着伞', description: '不管是雨伞还是透明伞都很有感觉' },
  { id: 'sword', label: '🗡️ 拿着剑/武器', value: 'holding a glowing sword, weapon|手里拿着发光的剑，武器', description: '非常适合战士或科幻主角' },
  { id: 'book', label: '📚 抱着书本', value: 'holding a magical book, glowing pages|抱着一本魔法书，发光的书页', description: '适合学生、法师或者安静的场景' },
  { id: 'flower', label: '🌻 拿着花朵', value: 'holding a flower, surrounded by petals|手里拿着一朵花，被花瓣包围', description: '很唯美浪漫的道具' },
  { id: 'phone', label: '📱 玩手机', value: 'holding a smartphone, screen glowing|手里拿着智能手机，屏幕发光', description: '现代人最真实的写照' },
  { id: 'camera', label: '📷 举着相机', value: 'holding a vintage camera, taking a photo|拿着复古相机，正在拍照', description: '文艺青年的标配' },
  { id: 'bag', label: '🎒 背着包包', value: 'wearing a backpack, traveling|背着背包，正在旅行', description: '感觉马上要出门旅行或上学' },
  { id: 'instrument', label: '🎸 拿着乐器', value: 'playing a guitar, musical instrument|弹着吉他，乐器', description: '很有艺术气息，吉他或小提琴' },
];

export const COMPOSITION_OPTIONS: PromptOption[] = [
  { id: 'center', label: '🎯 居中构图', value: 'centered composition, symmetric|居中构图，对称', description: '主角在正中间，稳重对称' },
  { id: 'rule-of-thirds', label: '📏 三分法则', value: 'rule of thirds composition|三分法则构图', description: '摄影最常用的构图，看起来很舒服' },
  { id: 'dynamic', label: '🌪️ 动态构图', value: 'dynamic angle, action pose|动态视角，动作姿势', description: '有动感，感觉主角马上要动起来' },
  { id: 'dutch', label: '📐 倾斜视角', value: 'dutch angle, tilted frame|倾斜视角，倾斜画面', description: '画面歪歪的，很有张力和不安感' },
  { id: 'golden-ratio', label: '🌀 黄金比例', value: 'golden ratio composition, fibonacci spiral|黄金比例构图，斐波那契螺旋', description: '最符合人类审美的完美比例构图' },
];

export const WEATHER_OPTIONS: PromptOption[] = [
  { id: 'sunny', label: '☀️ 晴天', value: 'sunny day, clear sky|晴天，晴朗天空', description: '大晴天，心情舒畅' },
  { id: 'rainy', label: '🌧️ 雨天', value: 'rainy day, raindrops, wet surface|雨天，雨滴，湿润表面', description: '下雨天，有雨滴和积水' },
  { id: 'snowy', label: '❄️ 雪天', value: 'snowing, snow covered, winter|下雪，积雪，冬天', description: '漫天飞雪，白茫茫一片' },
  { id: 'foggy', label: '🌫️ 雾天', value: 'foggy, misty, mysterious atmosphere|起雾，薄雾，神秘氛围', description: '有雾，感觉很神秘' },
  { id: 'stormy', label: '🌩️ 雷暴天气', value: 'stormy weather, lightning, dark clouds|雷暴天气，闪电，乌云', description: '乌云密布，电闪雷鸣，很震撼' },
  { id: 'windy', label: '🌬️ 狂风大作', value: 'windy, leaves blowing, dynamic wind|刮风，树叶飞舞，动态风', description: '风很大，衣服和头发都在飘' },
];

export const ENVIRONMENT_OPTIONS: PromptOption[] = [
  { id: 'indoor', label: '🏠 室内', value: 'indoor, interior room|室内，房间内部', description: '在屋子里' },
  { id: 'outdoor', label: '🌳 室外', value: 'outdoor, nature|室外，大自然', description: '在外面，大自然里' },
  { id: 'city', label: '🏙️ 城市街头', value: 'city street, urban environment|城市街头，都市环境', description: '在繁华的城市街道上' },
  { id: 'space', label: '🌌 外太空', value: 'outer space, galaxy, stars|外太空，银河，星星', description: '在宇宙星星中间' },
  { id: 'forest', label: '🌲 神秘森林', value: 'deep forest, ancient trees, magical woods|深林，古树，魔法森林', description: '长满大树的安静森林' },
  { id: 'ocean', label: '🌊 浩瀚海洋', value: 'underwater, ocean depth, coral reef|水下，海洋深处，珊瑚礁', description: '在海边或者美丽的海底世界' },
  { id: 'ruins', label: '🏛️ 古老废墟', value: 'ancient ruins, overgrown with vines, forgotten temple|古代废墟，长满藤蔓，被遗忘的神庙', description: '荒废了很久的古老建筑' },
  { id: 'cafe', label: '☕ 温暖咖啡馆', value: 'cozy cafe interior, warm lighting, coffee shop|舒适的咖啡馆内部，暖光，咖啡店', description: '非常有氛围感的小资咖啡馆' },
];

export const COLOR_OPTIONS: PromptOption[] = [
  { id: 'macaron', label: '🍭 甜美马卡龙', value: 'macaron color palette, pastel colors, soft pink and blue|马卡龙色系，粉彩，柔和的粉色和蓝色', description: '粉粉嫩嫩的，非常甜美可爱' },
  { id: 'morandi', label: '☕ 高级莫兰迪', value: 'morandi color palette, muted colors, low saturation|莫兰迪色系，柔和色彩，低饱和度', description: '灰灰的低饱和度，看起来很舒服高级' },
  { id: 'neon', label: '🚥 炫彩霓虹', value: 'neon color palette, vibrant blue and purple, high contrast|霓虹色系，鲜艳的蓝色和紫色，高对比度', description: '蓝紫色调为主，非常炫酷刺眼' },
  { id: 'sunset', label: '🌅 温暖夕阳', value: 'golden hour colors, warm orange and yellow, sunset glow|黄金时刻色彩，温暖的橙色和黄色，夕阳余晖', description: '像傍晚一样的金黄暖色调' },
  { id: 'bw', label: '🎞️ 黑白电影', value: 'black and white, monochrome, dramatic shadow|黑白，单色，戏剧性阴影', description: '只有黑白灰，很有年代感和故事感' },
  { id: 'vaporwave', label: '🟣 迷幻蒸汽波', value: 'vaporwave color palette, magenta and cyan, retro 80s|蒸汽波色系，洋红和青色，复古80年代', description: '紫红加青绿的复古迷幻感' },
  { id: 'earth', label: '🍂 自然大地色', value: 'earth tones, brown, olive green, warm rustic colors|大地色系，棕色，橄榄绿，温暖质朴的颜色', description: '棕色、绿色为主，很自然舒适' },
  { id: 'gold', label: '✨ 奢华黑金', value: 'black and gold color palette, luxurious, elegant|黑金色系，奢华，优雅', description: '黑底配上金闪闪的颜色，非常贵气' },
];

export const MOOD_OPTIONS: PromptOption[] = [
  { id: 'healing', label: '☀️ 温馨治愈', value: 'warm and healing atmosphere, cozy, peaceful|温暖治愈的氛围，舒适，宁静', description: '让人看了觉得很舒服、很放松' },
  { id: 'epic', label: '🌋 史诗震撼', value: 'epic atmosphere, majestic, grand scale, awe-inspiring|史诗感氛围，雄伟，宏大规模，令人敬畏', description: '像好莱坞大片一样，非常壮观' },
  { id: 'dreamy', label: '✨ 梦幻童话', value: 'dreamy atmosphere, magical, sparkling, fairytale|梦幻氛围，魔法，闪耀，童话', description: '像做梦一样，闪闪发光' },
  { id: 'lonely', label: '🌧️ 孤独清冷', value: 'lonely atmosphere, melancholy, quiet and cold|孤独的氛围，忧郁，安静清冷', description: '有点安静，甚至带点淡淡的伤感' },
  { id: 'creepy', label: '👻 恐怖诡异', value: 'creepy atmosphere, eerie, spooky, horror|诡异的氛围，怪异，令人毛骨悚然，恐怖', description: '让人有点害怕、心里发毛的感觉' },
  { id: 'romantic', label: '🌹 浪漫唯美', value: 'romantic atmosphere, elegant, beautiful love|浪漫的氛围，优雅，美丽的爱情', description: '充满爱意和浪漫气息' },
  { id: 'energetic', label: '🔥 热血高燃', value: 'energetic atmosphere, intense, adrenaline pumping|充满活力的氛围，激烈，令人肾上腺素飙升', description: '看一眼就让人觉得热血沸腾' },
  { id: 'nostalgic', label: '📻 怀旧复古', value: 'nostalgic atmosphere, retro feeling, vintage memories|怀旧氛围，复古感，复古记忆', description: '让人想起小时候或过去的美好' },
];

export const LIGHTING_OPTIONS: PromptOption[] = [
  { id: 'natural', label: '🌞 自然阳光', value: 'natural lighting, bright sunlight|自然光，明亮阳光', description: '像外面的大太阳一样亮堂自然' },
  { id: 'cinematic', label: '🎬 电影打光', value: 'cinematic lighting, dramatic lighting|电影布光，戏剧性光线', description: '明暗对比好看，像电影截图' },
  { id: 'spotlight', label: '🔦 舞台聚光灯', value: 'spotlight, dark background, focus on subject|聚光灯，深色背景，聚焦主体', description: '一束光只打在主角身上，背景暗暗的' },
  { id: 'backlight', label: '✨ 绝美逆光', value: 'backlighting, glowing edges, rim light|逆光，发光边缘，轮廓光', description: '光从背后照过来，主角身上有一圈金边' },
  { id: 'bi-color', label: '🔴🔵 红蓝双色光', value: 'bi-color lighting, red and blue neon lights|双色打光，红蓝霓虹灯', description: '左边红光右边蓝光，非常赛博朋克' },
  { id: 'volumetric', label: '🌫️ 丁达尔光束', value: 'volumetric lighting, god rays, light rays through dust|体积光，上帝之光，穿过灰尘的光束', description: '能清楚看到空气中一束一束的光（耶稣光）' },
  { id: 'soft', label: '☁️ 柔和漫反射', value: 'soft lighting, diffused light, soft shadows|柔和光线，漫反射光，柔和阴影', description: '光线很软，几乎没有硬硬的影子，适合拍脸' },
  { id: 'fire', label: '🔥 温暖火光', value: 'firelight, warm glowing light from fire, flickering|火光，温暖发光的火光，闪烁', description: '像坐在篝火或壁炉旁边照出来的暖光' },
];

export const CAMERA_OPTIONS: PromptOption[] = [
  { id: 'close-up', label: '😳 脸部特写', value: 'close-up shot, extreme close-up, focus on face|特写镜头，极度特写，聚焦面部', description: '镜头怼到脸上，看清表情和细节' },
  { id: 'portrait', label: '🧍 半身人像', value: 'portrait shot, upper body, depth of field|人像镜头，上半身，景深', description: '拍到腰部，背景模糊，最适合画人物' },
  { id: 'full-body', label: '🏃 全身镜头', value: 'full body shot, showing whole character|全身镜头，展现完整角色', description: '拍下整个人，顺便带一点点背景' },
  { id: 'wide', label: '🌄 广角大场景', value: 'wide angle shot, panoramic view, beautiful scenery|广角镜头，全景，美丽风景', description: '拍出很大的风景，人在画面里比较小' },
  { id: 'aerial', label: '🦅 航拍俯视', value: 'aerial view, bird\'s-eye view, looking down|航拍视角，鸟瞰视角，俯视', description: '像无人机从天上往下拍' },
  { id: 'low-angle', label: '🐜 蚂蚁仰视', value: 'low angle shot, looking up, giant scale|低角度镜头，仰视，巨大比例', description: '从下往上拍，显得主角非常高大威猛' },
  { id: 'macro', label: '🔍 微距镜头', value: 'macro photography, extreme detail on small objects|微距摄影，小物体上的极端细节', description: '把非常小的东西（比如虫子、水滴）拍得很大' },
  { id: 'fisheye', label: '👁️ 鱼眼镜头', value: 'fisheye lens, distorted perspective, ultra wide|鱼眼镜头，扭曲透视，超广角', description: '画面边缘会变成圆形的哈哈镜效果' },
];

export const QUALITY_OPTIONS: PromptOption[] = [
  { id: 'masterpiece', label: '💎 顶级画质 (推荐)', value: 'masterpiece, best quality, highly detailed, 8k resolution|杰作，最佳画质，极高细节，8k分辨率', description: '最清楚、最好看的质量，无脑选这个就行！' },
  { id: 'movie', label: '🎞️ 电影级质感', value: 'cinematic masterpiece, movie still, highly detailed|电影级杰作，电影剧照，极高细节', description: '像截取自电影一样，非常有质感' },
  { id: 'art', label: '🖼️ 精美插画', value: 'official art, masterpiece illustration, intricate details|官方艺术，杰作插画，错综复杂的细节', description: '有很多细节的好看插画，像官方原画' },
];

export const RANDOM_SUBJECTS = [
  "一只戴着墨镜的柯基犬",
  "一个赛博朋克风格的未来女战士",
  "一座建在云端上的魔法城堡",
  "一只背着小书包的可爱企鹅",
  "一个由水晶和玻璃做成的透明钢琴",
  "一辆飞在天空中的老式蒸汽火车",
  "一位穿着汉服的古代剑客",
  "一只巨大的发光水母",
  "一个装满星空和银河的玻璃罐子",
  "一只会发光的蓝色蝴蝶"
];
