
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** kwanza-stream
- **Date:** 2026-03-29
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 postapiauthregisterwithvaliddata
- **Test Code:** [TC001_postapiauthregisterwithvaliddata.py](./TC001_postapiauthregisterwithvaliddata.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 76, in <module>
  File "<string>", line 65, in test_postapiauthregisterwithvaliddata
AssertionError: 'user' key missing in response JSON

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/206d1c5b-6fb5-44aa-8a18-ab3fc0e22d0d
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 postapiauthloginwithvalidcredentials
- **Test Code:** [TC002_postapiauthloginwithvalidcredentials.py](./TC002_postapiauthloginwithvalidcredentials.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 59, in <module>
  File "<string>", line 30, in test_postapiauthloginwithvalidcredentials
AssertionError: Expected 201 on register, got 429

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/01a3deb5-e77e-4784-b976-a51da7a78a93
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 postapiauthrefreshwithvalidrefresh
- **Test Code:** [TC003_postapiauthrefreshwithvalidrefresh.py](./TC003_postapiauthrefreshwithvalidrefresh.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 77, in <module>
  File "<string>", line 39, in test_postapiauthrefreshwithvalidrefresh
AssertionError

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/3c2912ab-ee5b-4483-bf73-d6a18d082908
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 postapiauthlogoutclearsession
- **Test Code:** [TC004_postapiauthlogoutclearsession.py](./TC004_postapiauthlogoutclearsession.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 63, in <module>
  File "<string>", line 26, in test_postapiauthlogoutclearsession
AssertionError: Register failed: {"error":"Muitas tentativas. Aguarda 15 minutos."}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/1840f66c-35ed-4b2e-a96c-1a60b38c5a27
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 postapiauthrequestpasswordresetwithvalidemail
- **Test Code:** [TC005_postapiauthrequestpasswordresetwithvalidemail.py](./TC005_postapiauthrequestpasswordresetwithvalidemail.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/38b1aebc-dce7-42b9-a092-0b17274d0c95
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 postapiauthresetpasswordwithvalidtoken
- **Test Code:** [TC006_postapiauthresetpasswordwithvalidtoken.py](./TC006_postapiauthresetpasswordwithvalidtoken.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 65, in <module>
  File "<string>", line 49, in test_postapiauthresetpasswordwithvalidtoken
AssertionError

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/865f3b54-e92e-4922-ac58-fd03c9e427b5
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 getapiauthmewithvalidtoken
- **Test Code:** [TC007_getapiauthmewithvalidtoken.py](./TC007_getapiauthmewithvalidtoken.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 68, in <module>
  File "<string>", line 30, in test_getapiauthmewithvalidtoken
AssertionError: Register failed: 429 {"error":"Muitas tentativas. Aguarda 15 minutos."}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/982d28b6-1e3b-4475-8db6-e3366ce4f762
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 putapiusersmeupdateprofile
- **Test Code:** [TC008_putapiusersmeupdateprofile.py](./TC008_putapiusersmeupdateprofile.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 79, in <module>
  File "<string>", line 35, in test_putapiusersmeupdateprofile
AssertionError

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/b054724c-beea-48dc-8908-33272630a686
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 postapiusersonboardingcompleteonboarding
- **Test Code:** [TC009_postapiusersonboardingcompleteonboarding.py](./TC009_postapiusersonboardingcompleteonboarding.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 78, in <module>
  File "<string>", line 27, in test_post_api_users_onboarding_complete_onboarding
AssertionError: Register failed: {"error":"Muitas tentativas. Aguarda 15 minutos."}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/924dc23d-f0a6-40ef-9b72-8c39d9ba5540
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 postapiuploadavatarwithvalidimage
- **Test Code:** [TC010_postapiuploadavatarwithvalidimage.py](./TC010_postapiuploadavatarwithvalidimage.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 61, in <module>
  File "<string>", line 18, in test_postapiuploadavatarwithvalidimage
AssertionError: Register failed: {"error":"Muitas tentativas. Aguarda 15 minutos."}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/0080873c-b4bd-4244-8610-84513ca8f182
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 getapistreamslive
- **Test Code:** [TC011_getapistreamslive.py](./TC011_getapistreamslive.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/928fe023-e3dd-4642-9ba7-15017cce0c5d
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 getapistreamscategories
- **Test Code:** [TC012_getapistreamscategories.py](./TC012_getapistreamscategories.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/b5600e2a-bd9b-4977-87ca-7038f179c7b7
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 getapisearchquery
- **Test Code:** [TC013_getapisearchquery.py](./TC013_getapisearchquery.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 29, in <module>
  File "<string>", line 27, in test_get_api_search_query
AssertionError: 'results' key is not a list, got type dict

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/c542a164-1c3a-4328-8d2e-a110927c801c
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 getapivodslist
- **Test Code:** [TC014_getapivodslist.py](./TC014_getapivodslist.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/05467225-16f0-4879-9121-18d13075067c
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 getapistreamsuserbyid
- **Test Code:** [TC015_getapistreamsuserbyid.py](./TC015_getapistreamsuserbyid.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 46, in <module>
  File "<string>", line 22, in test_get_api_streams_user_by_id
AssertionError: Registration failed with status 429

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/fdaa662a-c97b-4147-ad0f-a9825db4f7c2
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 getapisearchnoresults
- **Test Code:** [TC016_getapisearchnoresults.py](./TC016_getapisearchnoresults.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 38, in <module>
  File "<string>", line 30, in test_getapisearchnoresults
AssertionError: 'results' should be a list

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/508d47f9-37a2-4040-8e57-348401bf671e/20a246d8-c780-4a40-92a8-3b7dfb3ca344
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **25.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---