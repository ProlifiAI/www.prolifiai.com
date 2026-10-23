import type { Article } from "@/content/insights/types";

/**
 * Primary search topic: "is design subjective" (AU/NZ autocomplete, 2026-10-23,
 * also "design is subjective or objective", "graphic design is subjective",
 * "design is not subjective"). Secondary: design feedback, presenting design
 * decisions, imposter syndrome designer. See docs/content/editorial-plan.md.
 *
 * No anecdotes are presented as real events. Factual claims are cited in the
 * sources block at the end.
 */
export const subjectiveNatureOfDesign: Article = {
  slug: "subjective-nature-of-design",
  title: "The Subjective Nature of Design: Why Good Work Gets Rejected",
  seoTitle: "Is Design Subjective? Why Good Work Gets Rejected",
  description:
    "Is design subjective? Partly. Why good work still gets rejected, how to tell taste from evidence, and how to handle feedback without losing your confidence.",
  standfirst:
    "Design lives somewhere between personal taste and measurable results. If you understand where that line sits, rejection gets easier to read, feedback gets easier to use, and your confidence gets harder to knock over.",
  category: "design",
  published: "2026-10-23",
  // Confirmed by Prolifi, 2026-10-23
  author: "Paul Stephen",
  keywords: [
    "is design subjective",
    "design is subjective or objective",
    "graphic design is subjective",
    "how to respond to design feedback",
    "how to present design decisions",
    "imposter syndrome designer",
  ],
  featured: true,
  body: [
    {
      type: "p",
      text: "If you have worked in design for any length of time, you will know the moment. You present something you are genuinely proud of. The layout is clear, the hierarchy works, it is accessible, and it does exactly what the brief asked. Then someone in the room says they just don't like it. No reason, or a reason that seems to have nothing to do with the work. The colour reminds them of something. It feels too busy, or not busy enough. Could it be more like a website they saw last week?",
    },
    {
      type: "p",
      text: "It is tempting to file this under \"people have no taste\" and move on. But that explanation is both unkind and unhelpful. A more useful one is that design really is partly subjective, and partly not, and most of the friction in design work comes from people mixing the two up. Including us.",
    },

    { type: "h2", id: "different-designs", text: "Everyone is looking at a slightly different design" },
    {
      type: "p",
      text: "Nobody sees a design with fresh eyes. Every person brings a lifetime of associations with them: the brands they trust, the products that let them down, the colours that carry meaning in their culture, the interfaces they learned on. A typeface that feels confident and modern to one person can feel cold and corporate to another. A shade of green can read as fresh, or as the logo of a company someone once had a terrible experience with.",
    },
    {
      type: "p",
      text: "Familiarity plays a large part too. Psychologists have long studied the [mere-exposure effect](https://en.wikipedia.org/wiki/Mere-exposure_effect): people tend to rate things more favourably simply because they have seen them before [1]. In design reviews this shows up constantly. The existing website feels \"right\" partly because everyone has looked at it every day for years. A new direction, however well reasoned, starts at a disadvantage because it is unfamiliar.",
    },
    {
      type: "p",
      text: "Then there is context. The same person can react differently to the same design depending on their mood, how rushed the meeting is, what they saw right before it, or whether they are viewing it on a large monitor or a phone in a taxi. None of this makes their reaction fake. It makes it *personal*, which is a different thing from being wrong.",
    },

    { type: "h2", id: "taste-is-real", text: "Taste is real. It just isn't the whole story" },
    {
      type: "p",
      text: "Here is where the \"design is subjective\" argument usually goes too far. Taste genuinely varies, but a lot of what makes a design work can be checked, tested and measured. Treating everything as opinion is just as unhelpful as treating everything as fact.",
    },
    {
      type: "p",
      text: "A practical way to think about it is to separate the parts of a design that depend on preference from the parts that can be evaluated against something outside anyone's personal taste:",
    },
    {
      type: "callout",
      title: "What can be evaluated, not just debated",
      items: [
        "**Usability**: can people find what they need and complete the task? You can watch them try: that is exactly what [usability testing](https://www.nngroup.com/articles/usability-testing-101/) is for.",
        "**Accessibility**: does text meet contrast requirements? [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) sets a minimum contrast ratio of 4.5:1 for normal-sized body text [2]. That is a number, not an opinion.",
        "**Readability**: line length, type size, spacing and hierarchy all have well-established effects on how easily people read.",
        "**Consistency**: do similar things look and behave the same way throughout? [Established usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) treat this as a core principle [3].",
        "**Business objectives**: does the design make the action the business needs, such as an enquiry, a booking or a sign-up, obvious and easy? This is the core of a [conversion-focused website](/services#build).",
      ],
    },
    {
      type: "p",
      text: "Then there is the part that genuinely is a matter of judgement: the mood of a brand, the choice between two equally usable layouts, whether a palette feels warm or restrained. These choices still matter, and they can still be argued for. They just cannot be *proven* in the same way.",
    },
    {
      type: "p",
      text: "Most design arguments get stuck because the conversation slides between these two territories without anyone noticing. A designer defends a contrast decision as if it were a matter of style. A stakeholder rejects an accessible layout because of a feeling. Both people are talking past each other.",
    },

    { type: "h2", id: "why-good-work-gets-rejected", text: "Why good work gets rejected anyway" },
    {
      type: "p",
      text: "Even when a design is objectively sound, there are good reasons it might not get approved, and very few of them are about the work itself.",
    },
    {
      type: "ul",
      items: [
        "**The feedback has no criteria.** If nobody agreed what success looks like before the design was made, every reviewer quietly uses their own definition. The loudest definition usually wins.",
        "**Seniority stands in for evidence.** Some teams call this the HiPPO problem: the Highest Paid Person's Opinion. It is not malicious. It is simply easier for a group to defer than to debate.",
        "**Risk feels bigger than reward.** A bold change is visible if it fails. Keeping things as they are rarely gets anyone in trouble, so unfamiliar work faces a higher bar.",
        "**People arrive late.** Someone who missed the research, the brief and the early rounds sees only the final design, without the reasoning behind it.",
        "**Committees average things out.** Often called [design by committee](https://en.wikipedia.org/wiki/Design_by_committee): when everyone's preferences must be accommodated, distinctive decisions get sanded down until the work offends nobody and persuades nobody.",
      ],
    },
    {
      type: "p",
      text: "It is worth saying plainly: stakeholder approval and a good user experience are not the same thing. A design can be signed off enthusiastically and still confuse every customer who uses it. A design can also be rejected and still be the better option for the people it was meant to serve. Approval is a business process. Usefulness is measured somewhere else.",
    },

    { type: "h2", id: "four-kinds-of-feedback", text: "How to tell which kind of feedback you are getting" },
    {
      type: "p",
      text: "When feedback lands, the first job is not to respond. It is to work out what kind of feedback it is, because each kind needs a different answer. One useful way to sort it:",
    },
    {
      type: "callout",
      title: "Four kinds of design feedback",
      items: [
        "**Preference**: \"I don't like the blue.\" A personal reaction. Worth hearing, rarely worth acting on alone.",
        "**Problem**: \"I couldn't find the pricing.\" Evidence that something is not working. Take it seriously, even if the suggested fix is wrong.",
        "**Constraint**: \"Legal needs this wording on the page.\" A real limit you did not know about. Design around it.",
        "**Goal**: \"We need more people to book a call.\" A success measure. The best feedback to receive, because it gives you something to design towards.",
      ],
    },
    {
      type: "p",
      text: "Much feedback arrives disguised. \"Make the logo bigger\" might be a preference, or it might be a genuine problem: the brand is not recognisable on mobile. \"It feels cluttered\" might be taste, or it might be a real hierarchy issue. Your job is to find out which, before you change anything.",
    },
    { type: "cta" },

    { type: "h2", id: "responding-to-feedback", text: "Responding without defending or caving" },
    {
      type: "p",
      text: "There are two easy responses to subjective feedback, and both are traps. The first is to defend every pixel, which makes you look precious and teaches people to stop sharing honest reactions. The second is to change everything you are asked to change, which turns you into a pair of hands and quietly erodes the quality of the work.",
    },
    { type: "p", text: "The useful middle ground starts with questions rather than answers:" },
    {
      type: "ul",
      items: [
        "\"What are you reacting to, specifically?\" This moves the conversation from a feeling to something you can look at together.",
        "\"Who do you think will struggle with this, and how?\" This connects a preference to a user, or reveals that there isn't one.",
        "\"Which of our goals does this get in the way of?\" This brings the agreed success criteria back into the room.",
        "\"If we changed it, what would better look like?\" Sometimes the answer reveals a real problem. Sometimes it reveals that nobody knows.",
      ],
    },
    {
      type: "p",
      text: "Asking these questions is not a tactic for winning. Sometimes the answers show that the feedback is right and you missed something. That is a good outcome. The point is to make decisions for reasons both sides can see.",
    },
    {
      type: "p",
      text: "And when a preference is the only thing at stake, and the change does no harm to usability or the business goal, it is often fine to simply make it. Not every hill is worth defending. Save your energy for the decisions that affect the people who will use the work.",
    },

    { type: "h2", id: "presenting-with-evidence", text: "Presenting design decisions with evidence" },
    {
      type: "p",
      text: "The best time to deal with subjective feedback is before it arrives. A design presented with its reasoning gets a very different reception from one presented as a finished picture.",
    },
    {
      type: "ol",
      items: [
        "**Start with the goal, not the design.** Remind everyone what the work is meant to achieve and for whom, before anyone sees a screen.",
        "**Show the decisions, not just the result.** Explain why the main action sits where it does, why the navigation is structured this way, why this contrast level was chosen.",
        "**Show what you considered and rejected.** It demonstrates rigour and answers \"what if we tried...\" before it is asked.",
        "**Bring evidence where you have it.** Usability test observations from [UX research](/services#scale), accessibility checks, analytics from the current site and research findings carry more weight than conviction.",
        "**Separate the testable from the taste.** Be clear which decisions are grounded in evidence and which are judgement calls. People trust the second kind more when you are honest about it.",
      ],
    },
    {
      type: "p",
      text: "If a disagreement cannot be settled in the room, suggest a way to settle it outside the room. Put both versions in front of a handful of real users. Run a simple test. Agree to measure after launch. Evidence ends arguments that opinions can only prolong.",
    },

    { type: "h2", id: "when-criticism-gets-into-your-head", text: "When the criticism gets into your head" },
    {
      type: "p",
      text: "None of the above makes rejection painless. Design is personal work. You put judgement and care into it, and when it is dismissed, it is hard not to hear \"you are not good at this\" instead of \"this did not land\".",
    },
    {
      type: "p",
      text: "If repeated criticism has you quietly convinced that everyone else knows what they are doing and you are about to be found out, you are in large company. The [imposter phenomenon](https://en.wikipedia.org/wiki/Impostor_syndrome) was described by psychologists Pauline Clance and Suzanne Imes in 1978 [4], and it has been widely discussed in creative and professional fields since. It tends to affect capable people, which is part of what makes it so persistent.",
    },
    { type: "p", text: "A few things genuinely help:" },
    {
      type: "ul",
      items: [
        "**Separate the work from the worker.** A rejected design is a decision about one piece of work in one context, not a verdict on your ability.",
        "**Keep a record of your reasoning.** When you write down why you made each decision, criticism becomes something to examine rather than something to absorb.",
        "**Track outcomes, not just approvals.** Notice when your work made something clearer, faster or easier for real people. That evidence is easy to forget and worth remembering.",
        "**Talk to peers.** Other designers have had the same meeting. Hearing that is often more useful than any framework.",
        "**Get a second opinion on the feedback itself.** Sometimes the feedback is fair. Sometimes it is not. Someone outside the situation can usually tell the difference faster than you can.",
      ],
    },
    {
      type: "p",
      text: "If self-doubt is affecting your wellbeing beyond the occasional bad week, it is worth talking to a qualified professional. There is no prize for carrying it alone.",
    },

    { type: "h2", id: "if-you-give-the-feedback", text: "If you are the one giving the feedback" },
    {
      type: "p",
      text: "Many of the people reading this are not designers at all. They are business owners and founders reviewing work for their own [website](/services#build) or [product](/services#scale), unsure whether their reaction is useful. It is. You know your customers and your business better than anyone. A few habits make your feedback far more valuable:",
    },
    {
      type: "ul",
      items: [
        "Agree what success looks like before the design begins, and judge the work against that.",
        "Describe the problem you see, not the solution you want. \"Customers won't know what to do next\" is more useful than \"make the button red\".",
        "Say when something is just your preference. It is completely fine to have one; labelling it helps the designer weigh it properly.",
        "Ask the designer to explain their reasoning before you ask for changes.",
        "Where you disagree and the stakes are real, test it with customers rather than settling it by rank.",
      ],
    },

    { type: "h2", id: "the-takeaway", text: "The takeaway" },
    {
      type: "p",
      text: "Design is subjective in the way it is *felt*, and far less subjective in the way it *works*. The skill is knowing which part of a conversation you are in. Treat taste with respect, treat evidence as decisive, and make your reasoning visible. Do that consistently and fewer good ideas get rejected for bad reasons, and the ones that do will not shake your confidence quite so much.",
    },
    {
      type: "p",
      text: "If you are weighing a design decision for your own business, our [UI/UX design](/services#scale) and [website](/services#build) work is built around making that reasoning visible. And for more practical thinking on websites, AI and product decisions, browse [Prolifi Insights](/insights).",
    },
    {
      type: "sources",
      items: [
        { label: "Zajonc, R. B. (1968). Attitudinal effects of mere exposure. Journal of Personality and Social Psychology, 9(2, Pt. 2), 1-27.", href: "https://doi.org/10.1037/h0025848" },
        { label: "W3C. Understanding WCAG 2.2: Contrast (Minimum), Success Criterion 1.4.3.", href: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html" },
        { label: "Nielsen, J. 10 Usability Heuristics for User Interface Design. Nielsen Norman Group.", href: "https://www.nngroup.com/articles/ten-usability-heuristics/" },
        { label: "Clance, P. R., & Imes, S. A. (1978). The imposter phenomenon in high achieving women: Dynamics and therapeutic intervention. Psychotherapy: Theory, Research & Practice, 15(3), 241-247.", href: "https://doi.org/10.1037/h0086006" },
      ],
    },
  ],
};
