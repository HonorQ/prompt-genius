import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Wand2, Sparkles, Image as ImageIcon, X, ArrowRight, BookOpen, Layers, Zap, ExternalLink } from 'lucide-react';
import { usePromptStore } from '../store/usePromptStore';
import { QUALITY_OPTIONS } from '../data/options';

// 优秀案例数据
const SHOWCASES = [
  {
    id: 1,
    title: '赛博朋克流浪猫',
    desc: '一只流浪猫坐在雨夜的赛博朋克街头',
    tags: ['赛博科幻', '雨天', '城市街头', '炫彩霓虹', '电影打光'],
    preset: {
      subject: '一只流浪橘猫，穿着一件破旧但发光的赛博朋克夹克，坐在积水的地面上',
      action: 'sitting down, relaxed pose|坐着，放松的姿势',
      style: 'cyberpunk style, neon lights, futuristic city, sci-fi|赛博朋克风格，霓虹灯，未来城市，科幻',
      composition: 'centered composition, symmetric|居中构图，对称',
      environment: 'city street, urban environment|城市街头，都市环境',
      weather: 'rainy day, raindrops, wet surface|雨天，雨滴，湿润表面',
      color: 'neon color palette, vibrant blue and purple, high contrast|霓虹色系，鲜艳的蓝色和紫色，高对比度',
      mood: 'lonely atmosphere, melancholy, quiet and cold|孤独的氛围，忧郁，安静清冷',
      lighting: 'cinematic lighting, dramatic lighting|电影布光，戏剧性光线',
      camera: 'close-up shot, extreme close-up, focus on face|特写镜头，极度特写，聚焦面部',
      quality: QUALITY_OPTIONS[0].value,
    }
  },
  {
    id: 2,
    title: '治愈系宫崎骏小屋',
    desc: '一个漂浮在云端的小屋，长满绿植',
    tags: ['日本动漫', '晴天', '温馨治愈', '自然阳光', '三分法则'],
    preset: {
      subject: '一个漂浮在白云上的木制小屋，屋顶长满了巨大的绿色植物和花朵',
      style: 'anime style, studio ghibli, makoto shinkai style, 2d illustration|动漫风格，吉卜力工作室，新海诚风格，2D插画',
      composition: 'rule of thirds composition|三分法则构图',
      environment: 'outdoor, nature|室外，大自然',
      weather: 'sunny day, clear sky|晴天，晴朗天空',
      color: 'macaron color palette, pastel colors, soft pink and blue|马卡龙色系，粉彩，柔和的粉色和蓝色',
      mood: 'warm and healing atmosphere, cozy, peaceful|温暖治愈的氛围，舒适，宁静',
      lighting: 'natural lighting, bright sunlight|自然光，明亮阳光',
      camera: 'wide angle shot, panoramic view, beautiful scenery|广角镜头，全景，美丽风景',
      quality: QUALITY_OPTIONS[0].value,
    }
  },
  {
    id: 3,
    title: '史诗级冰雪巨龙',
    desc: '一只巨大的冰龙在雪山上咆哮',
    tags: ['3D渲染', '雪天', '史诗震撼', '丁达尔光束', '蚂蚁仰视'],
    preset: {
      subject: '一只巨大的冰龙，鳞片像半透明的蓝宝石，张开翅膀在雪山之巅咆哮',
      style: '3d render, octane render, blind box toy style, cute 3d|3D渲染，辛烷渲染，盲盒玩具风格，可爱3D', 
      composition: 'dynamic angle, action pose|动态视角，动作姿势',
      environment: 'outdoor, nature|室外，大自然',
      weather: 'snowing, snow covered, winter|下雪，积雪，冬天',
      color: 'black and white, monochrome, dramatic shadow|黑白，单色，戏剧性阴影', 
      mood: 'epic atmosphere, majestic, grand scale, awe-inspiring|史诗感氛围，雄伟，宏大规模，令人敬畏',
      lighting: 'volumetric lighting, god rays, light rays through dust|体积光，上帝之光，穿过灰尘的光束',
      camera: 'low angle shot, looking up, giant scale|低角度镜头，仰视，巨大比例',
      quality: QUALITY_OPTIONS[0].value,
    }
  }
];

export default function Home() {
  const navigate = useNavigate();
  const state = usePromptStore();
  const [showCases, setShowCases] = useState(false);

  // Apply preset and jump to result
  const applyShowcase = (preset: any) => {
    state.reset(); // clear old state
    
    // Apply all preset values
    Object.keys(preset).forEach((key) => {
      state.setField(key as any, preset[key]);
    });
    
    navigate('/result');
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-10 sm:py-20 px-4 relative pt-24 sm:pt-32">
      {/* 
        由于外部 Layout 有 64px 的 fixed header，
        我们在这里使用更大的 scroll-margin-top 确保无论从哪跳回来都不会被遮挡。
        同时增加容器的 pt 避免初次加载时过于贴顶。
      */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl space-y-8 scroll-mt-32"
        id="hero"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          <span>全新 AI 提示词生成引擎</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
          解锁 AI 绘画的 <br className="hidden sm:block" />
          <span className="neon-text">无限创造力</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          不知道如何写出完美的提示词？通过我们简单直观的分步向导，
          生成专业级的 Prompt，让豆包、Midjourney、Stable Diffusion 为你呈现惊艳之作。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button 
            size="lg" 
            className="w-full sm:w-auto gap-2 group shadow-purple-500/50 hover:shadow-purple-500/80"
            onClick={() => navigate('/wizard')}
          >
            <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            开始生成提示词
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            className="w-full sm:w-auto gap-2"
            onClick={() => setShowCases(true)}
          >
            <ImageIcon className="w-5 h-5" />
            查看优秀案例
          </Button>
        </div>
      </motion.div>

      {/* Decorative features grid */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-5xl"
      >
        {[
          { title: '精准描述', desc: '拆解画面要素，从主体到细节，告别空洞模糊的描述。' },
          { title: '海量风格', desc: '内置数十种艺术风格与专业光影预设，一键切换画风。' },
          { title: '小白友好', desc: '全中文大白话选项，提供“一键盲盒”和“优秀案例”兜底。' }
        ].map((feature, idx) => (
          <div key={idx} className="glass-panel p-8 rounded-3xl text-left hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Guide Section */}
      <div id="guide" className="w-full max-w-5xl mt-32 text-left scroll-mt-32">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">使用指南</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Layers className="w-48 h-48 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">1. 基础分步向导</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              跟着我们的 7 步向导，像搭积木一样拼出提示词。你只需要提供一个简单的想法（比如：一只猫），剩下的画风、光影、构图等高级参数，都可以通过点击卡片来完成选择。
            </p>
            <ul className="text-slate-500 space-y-2 text-sm">
              <li>• 支持纯中文输入</li>
              <li>• 每个步骤都不是必填的，不想选可以直接跳过</li>
              <li>• 不懂参数？点击“随便帮我搭配”试试</li>
            </ul>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-48 h-48 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">2. 进阶玩法：一键盲盒</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              如果你今天没有灵感，完全不知道画什么，或者觉得一步步选太麻烦，可以在向导的**第一步右上角**点击“我完全不懂，帮我一键盲盒！”。
            </p>
            <ul className="text-slate-500 space-y-2 text-sm">
              <li>• 系统会随机生成一个极具创意的脑洞主题</li>
              <li>• 自动匹配大师级的高级光影与画质参数</li>
              <li>• 每次点击都会生成独一无二的提示词组合</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Platforms Section */}
      <div id="platforms" className="w-full max-w-5xl mt-32 mb-20 text-left scroll-mt-32">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
            <Layers className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">支持的 AI 平台</h2>
        </div>
        
        <p className="text-slate-400 mb-8 max-w-2xl">
          我们生成的提示词经过深度优化，采用“关键词短语拼接”的标准格式，完美兼容目前市面上几乎所有的主流 AI 绘画工具。建议优先选择“生成英文提示词”以获得最佳的图像质量。
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: '豆包 (Doubao)', desc: '字节跳动免费 AI', link: 'https://www.doubao.com' },
            { name: '腾讯元宝', desc: '腾讯出品，国内直连', link: 'https://yuanbao.tencent.com' },
            { name: 'Midjourney', desc: '专业级生图天花板', link: '#' },
            { name: 'Stable Diffusion', desc: '开源免费，可控性强', link: '#' },
          ].map((platform) => (
            <a 
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all group flex flex-col items-center justify-center text-center gap-2"
            >
              <h4 className="text-white font-bold group-hover:text-purple-300 transition-colors flex items-center gap-1">
                {platform.name}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h4>
              <span className="text-xs text-slate-500">{platform.desc}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Showcases Modal */}
      <AnimatePresence>
        {showCases && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#09090b] border border-white/10 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl shadow-purple-500/20"
            >
              <div className="p-6 sm:p-8 flex justify-between items-center border-b border-white/10">
                <div>
                  <h2 className="text-2xl font-bold text-white">优秀提示词案例</h2>
                  <p className="text-slate-400 text-sm mt-1">点击“一键套用”，我们会自动帮你填好这些复杂的参数。</p>
                </div>
                <button 
                  onClick={() => setShowCases(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto">
                {SHOWCASES.map((caseItem) => (
                  <div key={caseItem.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
                    <div className="flex-1 text-left">
                      <h3 className="text-xl font-bold text-white mb-2">{caseItem.title}</h3>
                      <p className="text-slate-300 mb-4">{caseItem.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {caseItem.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium border border-purple-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => applyShowcase(caseItem.preset)}
                      className="w-full sm:w-auto shrink-0 gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                    >
                      一键套用
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
