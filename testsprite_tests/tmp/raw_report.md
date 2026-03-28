
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
  File "<string>", line 50, in <module>
  File "<string>", line 31, in test_postapiauthregisterwithvaliddata
AssertionError: Expected 201 but got 400

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/b4e2437a-7a21-43f2-a2df-b1009e7b8884
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 postapiauthloginwithvalidcredentials
- **Test Code:** [TC002_postapiauthloginwithvalidcredentials.py](./TC002_postapiauthloginwithvalidcredentials.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 52, in <module>
  File "<string>", line 24, in test_postapiauthloginwithvalidcredentials
AssertionError: Expected status code 200, got 401

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/1aaebe6d-4eb5-4748-a08d-0a9c24b95cf0
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 postapiauthrefreshwithvalidrefresh
- **Test Code:** [TC003_postapiauthrefreshwithvalidrefresh.py](./TC003_postapiauthrefreshwithvalidrefresh.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 54, in <module>
  File "<string>", line 19, in test_postapiauthrefreshwithvalidrefresh
AssertionError: Register failed with status 400

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/eeebbb1a-43a3-4d44-b889-46d53a9ed852
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 postapiauthlogoutclearsession
- **Test Code:** [TC004_postapiauthlogoutclearsession.py](./TC004_postapiauthlogoutclearsession.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 56, in <module>
  File "<string>", line 17, in test_postapiauthlogoutclearsession
AssertionError: Register failed: {"error":"Erro de validação","details":[{"code":"invalid_type","expected":"string","received":"undefined","path":["displayName"],"message":"Required"},{"code":"invalid_literal","expected":true,"path":["termsAccepted"],"message":"Deves aceitar os Termos de Serviço"},{"code":"invalid_literal","expected":true,"path":["ageConfirmed"],"message":"Deves confirmar a idade mínima"}]}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/be250003-7fbc-4fe3-b37d-94c6c64a55f6
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 postapiauthrequestpasswordresetwithvalidemail
- **Test Code:** [TC005_postapiauthrequestpasswordresetwithvalidemail.py](./TC005_postapiauthrequestpasswordresetwithvalidemail.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/8c9fffb6-db1c-4ca1-846f-268925f6a127
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 postapiauthresetpasswordwithvalidtoken
- **Test Code:** [TC006_postapiauthresetpasswordwithvalidtoken.py](./TC006_postapiauthresetpasswordwithvalidtoken.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 56, in <module>
  File "<string>", line 27, in test_postapiauthresetpasswordwithvalidtoken
AssertionError: Register failed: 400 {"error":"Erro de validação","details":[{"code":"invalid_type","expected":"string","received":"undefined","path":["displayName"],"message":"Required"},{"validation":"regex","code":"invalid_string","message":"Número de telefone inválido","path":["phone"]},{"code":"invalid_literal","expected":true,"path":["termsAccepted"],"message":"Deves aceitar os Termos de Serviço"},{"code":"invalid_literal","expected":true,"path":["ageConfirmed"],"message":"Deves confirmar a idade mínima"}]}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/ef445770-62dd-4881-8f32-9e5a0c06a226
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 getapiauthmewithvalidtoken
- **Test Code:** [TC007_getapiauthmewithvalidtoken.py](./TC007_getapiauthmewithvalidtoken.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 55, in <module>
  File "<string>", line 22, in test_getapiauthmewithvalidtoken
AssertionError: Registration failed: {"error":"Erro de validação","details":[{"code":"invalid_type","expected":"string","received":"undefined","path":["displayName"],"message":"Required"},{"code":"invalid_literal","expected":true,"path":["termsAccepted"],"message":"Deves aceitar os Termos de Serviço"},{"code":"invalid_literal","expected":true,"path":["ageConfirmed"],"message":"Deves confirmar a idade mínima"}]}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/a9bbe7d9-d561-4bd7-8e44-8520a5d3c2fd
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 putapiusersmeupdateprofile
- **Test Code:** [TC008_putapiusersmeupdateprofile.py](./TC008_putapiusersmeupdateprofile.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 64, in <module>
  File "<string>", line 23, in test_put_api_users_me_update_profile
AssertionError: Registration failed: {"error":"Erro de validação","details":[{"code":"invalid_type","expected":"string","received":"undefined","path":["displayName"],"message":"Required"},{"code":"invalid_literal","expected":true,"path":["termsAccepted"],"message":"Deves aceitar os Termos de Serviço"},{"code":"invalid_literal","expected":true,"path":["ageConfirmed"],"message":"Deves confirmar a idade mínima"}]}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/170aec52-e214-4657-ae96-dc38fd024a70
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 postapiusersonboardingcompleteonboarding
- **Test Code:** [TC009_postapiusersonboardingcompleteonboarding.py](./TC009_postapiusersonboardingcompleteonboarding.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 92, in <module>
  File "<string>", line 31, in test_post_api_users_onboarding_complete_onboarding
AssertionError: Register failed: {"error":"Erro de validação","details":[{"code":"invalid_type","expected":"string","received":"undefined","path":["displayName"],"message":"Required"},{"code":"invalid_literal","expected":true,"path":["termsAccepted"],"message":"Deves aceitar os Termos de Serviço"},{"code":"invalid_literal","expected":true,"path":["ageConfirmed"],"message":"Deves confirmar a idade mínima"}]}

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/cac3ec27-4789-4471-9f39-b97272d9702c
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 postapiuploadavatarwithvalidimage
- **Test Code:** [TC010_postapiuploadavatarwithvalidimage.py](./TC010_postapiuploadavatarwithvalidimage.py)
- **Test Error:** Traceback (most recent call last):
  File "/var/task/handler.py", line 258, in run_with_retry
    exec(code, exec_env)
  File "<string>", line 94, in <module>
  File "<string>", line 29, in test_postapiuploadavatarwithvalidimage
AssertionError: Expected 201 on register, got 500 with message Proxy server error: 

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/29f834d9-2188-4b30-9ba3-dde500e82327/bf6240bd-37c9-468c-989a-9ed3fc7a4204
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **10.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---