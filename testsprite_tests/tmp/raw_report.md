
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** kwanza-stream
- **Date:** 2026-03-28
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 postapiauthregisterwithvaliddata
- **Test Code:** [TC001_postapiauthregisterwithvaliddata.py](./TC001_postapiauthregisterwithvaliddata.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 37, in <module>
  File "<string>", line 24, in test_postapiauthregisterwithvaliddata
AssertionError: Expected status 201, got 400. Response: {"error":"Este número de telefone já está registado."}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/5bac08b8-b36e-4fb2-932a-25efe3705cbd
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 postapiauthloginwithvalidcredentials
- **Test Code:** [TC002_postapiauthloginwithvalidcredentials.py](./TC002_postapiauthloginwithvalidcredentials.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 68, in <module>
  File "<string>", line 33, in test_postapiauthloginwithvalidcredentials
AssertionError: Expected 201, got 400

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/84bcd79f-0edd-4791-873e-c44316592cc6
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 postapiauthrefreshwithvalidrefresh
- **Test Code:** [TC003_postapiauthrefreshwithvalidrefresh.py](./TC003_postapiauthrefreshwithvalidrefresh.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 86, in <module>
  File "<string>", line 41, in test_postapiauthrefreshwithvalidrefresh
AssertionError: No user object in register response

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/298a6b3b-90c7-4a7e-b91c-9bb8e8ac68bc
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 postapiauthlogoutclearsession
- **Test Code:** [TC004_postapiauthlogoutclearsession.py](./TC004_postapiauthlogoutclearsession.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 60, in <module>
  File "<string>", line 21, in test_postapiauthlogoutclearsession
AssertionError

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/9057e51f-01e4-4269-92d0-fb06f49e0628
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 postapiauthrequestpasswordresetwithvalidemail
- **Test Code:** [TC005_postapiauthrequestpasswordresetwithvalidemail.py](./TC005_postapiauthrequestpasswordresetwithvalidemail.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/29e45462-722b-4dbe-9a20-a91e9ef50726
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 postapiauthresetpasswordwithvalidtoken
- **Test Code:** [TC006_postapiauthresetpasswordwithvalidtoken.py](./TC006_postapiauthresetpasswordwithvalidtoken.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 118, in <module>
  File "<string>", line 59, in test_postapiauthresetpasswordwithvalidtoken
AssertionError

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/d104b38c-23b6-4cee-b50d-5f610c0eae25
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 getapiauthmewithvalidtoken
- **Test Code:** [TC007_getapiauthmewithvalidtoken.py](./TC007_getapiauthmewithvalidtoken.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 94, in <module>
  File "<string>", line 36, in test_get_api_auth_me_with_valid_token
AssertionError

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/aad23f1c-3b19-43d2-9bc6-0070d355cd22
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 putapiusersmeupdateprofile
- **Test Code:** [TC008_putapiusersmeupdateprofile.py](./TC008_putapiusersmeupdateprofile.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 94, in <module>
  File "<string>", line 38, in test_putapiusersmeupdateprofile
AssertionError

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/2ce4ad32-cfa5-4159-88c8-2cd2d0bea157
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 postapiusersonboardingcompleteonboarding
- **Test Code:** [TC009_postapiusersonboardingcompleteonboarding.py](./TC009_postapiusersonboardingcompleteonboarding.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 86, in <module>
  File "<string>", line 41, in test_post_api_users_onboarding_complete_onboarding
  File "<string>", line 38, in test_post_api_users_onboarding_complete_onboarding
AssertionError

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/116a94cc-6ac4-4471-b4cc-1b1a103a91d1
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 postapiuploadavatarwithvalidimage
- **Test Code:** [TC010_postapiuploadavatarwithvalidimage.py](./TC010_postapiuploadavatarwithvalidimage.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 54
    b'\x1f\x1e\x1d\x19\x1c\x1c $.'" \' ",#\x1c\x1c(7),01444\x1f\'9=82<.342'
                                        ^
SyntaxError: cannot mix bytes and nonbytes literals

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/3f4a7e6a-8e63-40b8-807c-e21a3eb1564a
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 getapistreamslive
- **Test Code:** [TC011_getapistreamslive.py](./TC011_getapistreamslive.py)
- **Test Error:** Traceback (most recent call last):
  File "<string>", line 11, in test_getapistreamslive
  File "/var/lang/lib/python3.12/site-packages/requests/models.py", line 1024, in raise_for_status
    raise HTTPError(http_error_msg, response=self)
requests.exceptions.HTTPError: 401 Client Error: Unauthorized for url: http://localhost:3001/api/streams?status=live&limit=20

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 26, in <module>
  File "<string>", line 13, in test_getapistreamslive
AssertionError: Request failed: 401 Client Error: Unauthorized for url: http://localhost:3001/api/streams?status=live&limit=20

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/7d095b35-b98d-412e-90c9-81b339ce28e3
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 getapistreamscategories
- **Test Code:** [TC012_getapistreamscategories.py](./TC012_getapistreamscategories.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/ab9630bf-e737-4b1a-bd7f-b92f37704139
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 getapisearchquery
- **Test Code:** [TC013_getapisearchquery.py](./TC013_getapisearchquery.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 23, in <module>
  File "<string>", line 18, in test_get_api_search_query
AssertionError: Response JSON does not contain 'results' key

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/f26e2991-638a-496c-b6fd-016f2f67a173
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 getapivodslist
- **Test Code:** [TC014_getapivodslist.py](./TC014_getapivodslist.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/19b6072f-8e6a-4a90-ba14-851425a25d71
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 getapistreamsuserbyid
- **Test Code:** [TC015_getapistreamsuserbyid.py](./TC015_getapistreamsuserbyid.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 43, in <module>
  File "<string>", line 22, in test_get_api_streams_user_by_id
AssertionError: Expected 201 Created, got 400

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/532252f8-219e-4f82-8387-8c1651199eec
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 getapisearchnoresults
- **Test Code:** [TC016_getapisearchnoresults.py](./TC016_getapisearchnoresults.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 45, in <module>
  File "<string>", line 24, in test_get_api_search_no_results
AssertionError: Response JSON missing 'results' key

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/0f2cd640-f07e-4205-be5d-7523f7940c8b/b2a5cd79-e975-4ccc-8627-6f8bb8e1d90d
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **18.75** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---