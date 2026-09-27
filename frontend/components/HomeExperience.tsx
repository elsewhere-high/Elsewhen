"use client";

import Image from "next/image";
import Link from "next/link";
import { BrandMark } from "./BrandMark";
import { usePreferences } from "./Preferences";
import styles from "./home.module.css";

export function HomeExperience() {
  const { language, setLanguage } = usePreferences();
  const t = (en: string, zh: string) => language === "zh" ? zh : en;
  const paths = [
    { number: "01", href: "/setup", title: t("Enter the council", "加入议会"), text: t("Choose your seat. Give six minds their own motives. Find out whom you can trust.", "选择你的席位，为六个独立智能体赋予动机，判断谁值得信任。"), label: t("Play a round", "开始一局") },
    { number: "02", href: "/explore", title: t("Take the long way", "走进另一条路"), text: t("Follow the lantern into a quiet world of abandoned clues and unfinished stories.", "跟随提灯，探索遗落的线索与尚未结束的故事。"), label: t("Explore the world", "探索世界") },
    { number: "03", href: "/tournament", title: t("Question the outcome", "重新审视结局"), text: t("Compare models, inspect evidence, and discover how different choices change a game.", "对比模型、检查证据，观察不同选择如何改变一场游戏。"), label: t("Open the laboratory", "打开实验室") },
  ];
  return (
    <main className={styles.page}>
      <nav className={styles.nav} aria-label={t("Main navigation", "主导航")}>
        <Link className={styles.wordmark} href="/" aria-label="Elsewhen home"><BrandMark />Elsewhen<span>01 / ∞</span></Link>
        <div className={styles.navlinks}>
          <Link href="/how-to-play">{t("Field guide", "玩法指南")}</Link>
          <Link href="/presentation">{t("Inside the system", "了解系统")}</Link>
          <button onClick={() => setLanguage(language === "zh" ? "en" : "zh")} aria-label={t("Switch to Chinese", "Switch to English")}>{language === "zh" ? "EN" : "中文"}</button>
        </div>
      </nav>

      <section className={styles.hero} aria-labelledby="elsewhen-title">
        <div className={styles.copy}>
          <p className={styles.eyebrow}><span />{t("A SOCIAL EXPERIMENT IN POSSIBLE WORLDS", "一场关于可能世界的社会实验")}</p>
          <h1 id="elsewhen-title">{t("A different choice.", "换一个选择。")}<br /><em>{t("Another story.", "走向另一个故事。")}</em></h1>
          <p className={styles.description}>{t("One table. Seven perspectives. Join six independent AI minds in a world of hidden roles, private memories, and decisions you can revisit.", "同一张桌子，七种不同视角。与六个独立 AI 智能体共同进入一个拥有隐藏身份、私人记忆和可回溯选择的世界。")}</p>
          <div className={styles.actions}>
            <Link className={styles.primary} href="/setup">{t("Find your seat", "找到你的席位")}<span aria-hidden="true">↗</span></Link>
            <Link className={styles.secondary} href="/explore">{t("Wander first", "先去探索")}<span aria-hidden="true">→</span></Link>
          </div>
          <p className={styles.offline}><span>○</span>{t("Start with offline agents. No API key needed.", "使用离线智能体即可开始，无需 API 密钥。")}</p>
          <dl className={styles.stats}>
            <div><dt>06</dt><dd>{t("independent minds", "独立智能体")}</dd></div>
            <div><dt>01</dt><dd>{t("human perspective", "人类视角")}</dd></div>
            <div><dt>∞</dt><dd>{t("possible stories", "可能的故事")}</dd></div>
          </dl>
        </div>
        <div className={styles.scene}>
          <Image src="/scenes/jungle-council.webp" alt={t("A firelit council clearing among ancient trees", "古树之间，被篝火照亮的议会空地")} fill preload sizes="(max-width: 850px) 94vw, 48vw" />
          <div className={styles.sceneShade} />
          <div className={styles.sceneTop}><span>{t("FIELD NOTES", "观察手记")}</span><span>EW—001</span></div>
          <div className={styles.orbit} aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className={styles.sceneBottom}><p>{t("THE MOMENT BEFORE A CHOICE", "做出选择之前的瞬间")}</p><h2>{t("Nothing is decided.", "一切尚未决定。")}</h2><span>{t("The council is waiting for you.", "议会正在等待你的加入。")}</span></div>
        </div>
      </section>

      <section className={styles.paths} aria-labelledby="paths-title">
        <div className={styles.sectionTitle}><p>{t("CHOOSE YOUR WAY IN", "选择你的入口")}</p><h2 id="paths-title">{t("Play. Observe. Try otherwise.", "参与，观察，再试另一种可能。")}</h2></div>
        <div className={styles.pathGrid}>{paths.map(item => <Link className={styles.path} href={item.href} key={item.number}><span className={styles.pathNumber}>{item.number} <b aria-hidden="true">↗</b></span><h3>{item.title}</h3><p>{item.text}</p><strong>{item.label}</strong></Link>)}</div>
      </section>

      <section className={styles.evidence}>
        <p>{t("FOLLOW THE EVIDENCE", "沿着证据继续探索")}</p>
        <h2>{t("A mind has a memory. A choice leaves a trace.", "每个智能体都有记忆，每次选择都会留下痕迹。")}</h2>
        <div><Link href="/relationships">{t("Relationship archive", "关系档案")} ↗</Link><Link href="/history">{t("Game archive", "游戏档案")} ↗</Link><Link href="/presentation">{t("How the agents work", "智能体如何工作")} ↗</Link></div>
      </section>
      <footer className={styles.footer}><Link href="/" className={styles.wordmark}><BrandMark size={25} />Elsewhen</Link><span>{t("Every choice has an elsewhere.", "每个选择，都有另一种可能。")}</span><div><Link href="/share">{t("Share", "分享")}</Link><Link href="/connect">{t("About", "关于")}</Link><a href="/license.txt">AGPL-3.0</a></div></footer>
    </main>
  );
}
